import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MATERIAL } from '../../../../shared/material/materials';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { ApiClient } from '../../../../core/services/api-client.service';
import { API_ENDPOINTS } from '../../../../core/config/api-endpoints';

interface PayrollRunRecord {
  run_id: string;
  month: number;
  year: number;
  payroll_cycle: string;
  status: 'draft' | 'approved' | 'locked' | string;
}

interface PayrollEmployeeRecord {
  employee_id: string;
  employee_name: string;
  template_name: string;
  gross: number;
  lop_days: number;
  net_preview: number;
  total_deduction: number;
  working_days: number;
  payable_days: number;
  status: string;
}

@Component({
  selector: 'app-payroll-process',
  imports: [MATERIAL, CommonModule, FormsModule, PageHeader],
  templateUrl: './payroll-process.html',
  styleUrl: './payroll-process.scss',
})
export class PayrollProcess implements OnInit, OnDestroy {
  private _httpClient = inject(ApiClient);
  private _toastr = inject(ToastrService);
  private destroy$ = new Subject<void>();

  breadcrumbs = ['HRMS', 'Payroll', 'Payroll Process'];
  displayedColumns = ['employee_name', 'template_name', 'gross', 'lop_days', 'net_preview', 'status', 'actions'];

  selectedMonth = signal('');
  payrollCycle = signal('Monthly');
  validatePreviousLock = signal(true);

  searchQuery = signal('');
  statusFilter = signal<'ALL' | 'READY' | 'ERROR'>('ALL');

  loadingRun = signal(false);
  loadingEmployees = signal(false);
  actionLoading = signal(false);

  currentRun = signal<PayrollRunRecord | null>(null);
  employees = signal<PayrollEmployeeRecord[]>([]);

  filteredEmployees = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const status = this.statusFilter();

    return this.employees().filter((row) => {
      const matchText =
        !q ||
        row.employee_name.toLowerCase().includes(q) ||
        row.employee_id.toLowerCase().includes(q) ||
        row.template_name.toLowerCase().includes(q);

      const rowStatus = (row.status || '').toUpperCase();
      const matchStatus =
        status === 'ALL' ||
        (status === 'READY' && rowStatus !== 'ERROR') ||
        (status === 'ERROR' && rowStatus === 'ERROR');

      return matchText && matchStatus;
    });
  });

  stats = computed(() => {
    const rows = this.employees();
    const totalEmployees = rows.length;
    const totalGross = rows.reduce((sum, row) => sum + this.toNumber(row.gross), 0);
    const totalDeductions = rows.reduce((sum, row) => sum + this.toNumber(row.total_deduction), 0);
    const totalNet = rows.reduce((sum, row) => sum + this.toNumber(row.net_preview), 0);

    return [
      { label: 'Employees', value: totalEmployees, icon: 'groups', color: '#2563eb', bgColor: '#eff6ff', isCurrency: false },
      { label: 'Gross', value: totalGross, icon: 'payments', color: '#16a34a', bgColor: '#f0fdf4', isCurrency: true },
      { label: 'Deductions', value: totalDeductions, icon: 'receipt_long', color: '#ea580c', bgColor: '#fff7ed', isCurrency: true },
      { label: 'Net Salary', value: totalNet, icon: 'account_balance_wallet', color: '#7c3aed', bgColor: '#f5f3ff', isCurrency: true },
    ];
  });

  ngOnInit(): void {
    
  }
  get canApprove(): boolean {
    return !!this.currentRun()?.run_id && this.getRunStatus() === 'draft';
  }

  get canLock(): boolean {
    return !!this.currentRun()?.run_id && this.getRunStatus() === 'approved';
  }

  get canReverse(): boolean {
    const status = this.getRunStatus();
    return !!this.currentRun()?.run_id && (status === 'approved' || status === 'locked');
  }

  getRunStatus(): string {
    return (this.currentRun()?.status || 'draft').toLowerCase();
  }

  onMonthChange(value: string): void {
    this.selectedMonth.set(value);
  }

  onSearch(value: string): void {
    this.searchQuery.set(value || '');
  }

  onStatusFilter(value: 'ALL' | 'READY' | 'ERROR'): void {
    this.statusFilter.set(value);
  }

  onValidatePreviousLockChange(value: boolean): void {
    this.validatePreviousLock.set(!!value);
  }

  createPayrollRun(): void {
    const monthYear = this.getMonthYearFromInput();
    if (!monthYear) {
      this._toastr.warning('Please select payroll month', 'Validation');
      return;
    }

    const payload = this.buildCreateRunPayload(monthYear.month, monthYear.year);
    this.loadingRun.set(true);
    this._httpClient.post(API_ENDPOINTS.payroll.create_payroll_run, payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response: any) => {
        const run = response?.data?.run || response?.data || response;
        const runId = run?.run_id || run?._id || run?.id;
        if (!runId) {
          this._toastr.error('Run id is missing in API response', 'Error');
          this.loadingRun.set(false);
          return;
        }

        this.currentRun.set({
          run_id: runId,
          month: run?.month ?? monthYear.month,
          year: run?.year ?? monthYear.year,
          payroll_cycle: run?.payroll_cycle ?? this.payrollCycle(),
          status: (run?.status || 'draft').toLowerCase(),
        });

        this._toastr.success('Payroll run created', 'Success');
        this.fetchPayrollEmployees();
        this.loadingRun.set(false);
      },
      error: (error) => {
        this.loadingRun.set(false);
        this._toastr.error(error?.error?.msg || 'Failed to create payroll run', 'Error');
      },
    });
  }

  fetchPayrollEmployees(): void {
    const runId = this.currentRun()?.run_id;
    if (!runId) {
      this._toastr.warning('Create payroll run first', 'Validation');
      return;
    }

    this.loadingEmployees.set(true);
    this._httpClient.get(API_ENDPOINTS.payroll.get_payroll_employees(runId)).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response: any) => {
        const rows = response?.data?.employees || response?.data || [];
        const mapped = rows.map((item: any) => this.mapEmployeeRecord(item));
        this.employees.set(mapped);
        this.loadingEmployees.set(false);
      },
      error: (error) => {
        this.loadingEmployees.set(false);
        this._toastr.error(error?.error?.msg || 'Failed to load payroll employees', 'Error');
      },
    });
  }

  recalculateEmployee(row: PayrollEmployeeRecord): void {
    const runId = this.currentRun()?.run_id;
    if (!runId || !row?.employee_id) {
      return;
    }
    if (this.getRunStatus() !== 'draft') {
      this._toastr.warning('Recalculation is allowed only in Draft', 'Validation');
      return;
    }

    const payload = this.buildRecalculatePayload(row.employee_id);
    this.actionLoading.set(true);
    this._httpClient
      .post(API_ENDPOINTS.payroll.recalculate_employee(runId, row.employee_id), payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this._toastr.success(`Recalculated ${row.employee_name}`, 'Success');
          this.fetchPayrollEmployees();
          this.actionLoading.set(false);
        },
        error: (error) => {
          this.actionLoading.set(false);
          this._toastr.error(error?.error?.msg || 'Failed to recalculate employee', 'Error');
        },
      });
  }

  approvePayroll(): void {
    const runId = this.currentRun()?.run_id;
    if (!runId || this.getRunStatus() !== 'draft') {
      return;
    }

    const payload = this.buildApprovePayload();
    this.actionLoading.set(true);
    this._httpClient.post(API_ENDPOINTS.payroll.approve_payroll(runId), payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.currentRun.update((run) => (run ? { ...run, status: 'approved' } : run));
        this.actionLoading.set(false);
        this._toastr.success('Payroll approved', 'Success');
      },
      error: (error) => {
        this.actionLoading.set(false);
        this._toastr.error(error?.error?.msg || 'Failed to approve payroll', 'Error');
      },
    });
  }

  lockPayroll(): void {
    const runId = this.currentRun()?.run_id;
    if (!runId || this.getRunStatus() !== 'approved') {
      return;
    }

    const payload = this.buildLockPayload();
    this.actionLoading.set(true);
    this._httpClient.post(API_ENDPOINTS.payroll.lock_payroll(runId), payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.currentRun.update((run) => (run ? { ...run, status: 'locked' } : run));
        this.actionLoading.set(false);
        this._toastr.success('Payroll locked', 'Success');
      },
      error: (error) => {
        this.actionLoading.set(false);
        this._toastr.error(error?.error?.msg || 'Failed to lock payroll', 'Error');
      },
    });
  }

  reversePayroll(): void {
    const runId = this.currentRun()?.run_id;
    if (!runId) {
      return;
    }

    const payload = this.buildReversePayload();
    this.actionLoading.set(true);
    this._httpClient.post(API_ENDPOINTS.payroll.reverse_payroll(runId), payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.currentRun.update((run) => (run ? { ...run, status: 'draft' } : run));
        this.fetchPayrollEmployees();
        this.actionLoading.set(false);
        this._toastr.success('Payroll reversed to Draft', 'Success');
      },
      error: (error) => {
        this.actionLoading.set(false);
        this._toastr.error(error?.error?.msg || 'Failed to reverse payroll', 'Error');
      },
    });
  }

  buildCreateRunPayload(month: number, year: number): any {
    return {
      month,
      year,
      payroll_cycle: this.payrollCycle(),
      validate_previous_lock: this.validatePreviousLock(),
    };
  }

  buildRecalculatePayload(employeeId: string): any {
    return {
      employee_id: employeeId,
      include_attendance: true,
      include_leave: true,
      include_statutory: true,
      include_overtime: true,
      trigger: 'manual',
    };
  }

  buildApprovePayload(): any {
    return {
      status: 'approved',
      approved_at: new Date().toISOString(),
    };
  }

  buildLockPayload(): any {
    return {
      status: 'locked',
      locked_at: new Date().toISOString(),
      lock_reason: 'Payroll approved and finalized',
    };
  }

  buildReversePayload(): any {
    return {
      reverse_reason: 'Manual reverse by admin from payroll process screen',
      reversed_at: new Date().toISOString(),
    };
  }

  mapEmployeeRecord(item: any): PayrollEmployeeRecord {
    const employeeName =
      item?.employee_name ||
      `${item?.employee?.first_name || ''} ${item?.employee?.last_name || ''}`.trim() ||
      'Unknown';

    return {
      employee_id: item?.employee_id || item?._id || '',
      employee_name: employeeName,
      template_name: item?.template_name || item?.template?.name || '--',
      gross: this.toNumber(item?.gross ?? item?.total_earnings ?? item?.gross_salary),
      lop_days: this.toNumber(item?.lop_days ?? item?.attendance?.lop_days),
      net_preview: this.toNumber(item?.net_preview ?? item?.net_salary),
      total_deduction: this.toNumber(item?.total_deduction ?? item?.deductions_total),
      working_days: this.toNumber(item?.working_days ?? item?.attendance?.working_days),
      payable_days: this.toNumber(item?.payable_days ?? item?.attendance?.payable_days),
      status: (item?.status || 'READY').toUpperCase(),
    };
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(this.toNumber(value));
  }

  getStatusClass(status: string): string {
    const normalized = (status || '').toLowerCase();
    if (normalized === 'locked') return 'locked';
    if (normalized === 'approved') return 'approved';
    if (normalized === 'draft') return 'draft';
    if (normalized === 'error') return 'error';
    return 'ready';
  }

  private getMonthYearFromInput(): { month: number; year: number } | null {
    const value = this.selectedMonth();
    if (!value || !value.includes('-')) return null;

    const [yearText, monthText] = value.split('-');
    const year = Number(yearText);
    const month = Number(monthText);
    if (!year || !month) return null;

    return { month, year };
  }

  private toNumber(value: any): number {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
