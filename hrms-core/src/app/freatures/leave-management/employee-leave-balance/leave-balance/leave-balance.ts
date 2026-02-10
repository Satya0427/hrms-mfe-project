import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { MATERIAL } from '../../../../shared/material/materials';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PageHeader } from '../../../../shared/components/page-header/page-header';
import { ApiClient } from '../../../../core/services/api-client.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api-endpoints';
import { ActivatedRoute } from '@angular/router';

export interface ILeaveBalance {
  leave_type_id: string;
  leave_type_name: string;
  leave_type_code: string;
  total_credited: number;
  total_debited: number;
  available_balance: number;
  pending_requests: number;
  color?: string;
}

export interface LedgerEntry {
  _id: string;
  date: Date;
  leave_type: string;
  entry_type: 'CREDIT' | 'DEBIT' | 'REVERSAL' | 'ADJUSTMENT';
  quantity: number;
  balance_after: number;
  reference_type: string;
  reference_id?: string;
  remarks?: string;
}

@Component({
  selector: 'app-leave-balance',
  imports: [MATERIAL, CommonModule, FormsModule, PageHeader],
  templateUrl: './leave-balance.html',
  styleUrl: './leave-balance.scss',
})
export class LeaveBalance {
  private _location = inject(Location);
  private _httpClient = inject(ApiClient);
  private _toastr = inject(ToastrService);
  private destroy$ = new Subject<void>();
  private _route = inject(ActivatedRoute);

  startDate = new Date(new Date().getFullYear(), 0, 1); // Jan 1 of current year
  endDate = new Date();
  selectedLeaveType = 'All';
  selectedEntryType = 'All';

  // Data
  leaveBalances = signal<ILeaveBalance[]>([]);
  ledgerEntries = signal<LedgerEntry[]>([]);

  // Table
  displayedColumns = ['date', 'leave_type', 'entry_type', 'quantity', 'balance_after', 'reference', 'remarks'];
  dataSource = new MatTableDataSource<LedgerEntry>([]);

  // Stats
  totalCredits = signal<number>(0);
  totalDebits = signal<number>(0);
  totalBalance = signal<number>(0);

  id!: string;

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id')!;
    this.loadLeaveBalance();
  }

  loadLeaveBalance() {
    const payload = {
      employee_id: this.id,
      as_of_date: new Date()
    };
    this._httpClient.post(API_ENDPOINTS.leave.get_leave_balance, payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        // Map API response to interface
        const apiBalances = res?.data?.balances || [];
        const mappedBalances: ILeaveBalance[] = apiBalances.map((item: any) => ({
          leave_type_id: item.leave_type_id,
          leave_type_name: item.leave_type_name,
          leave_type_code: item.leave_type_code,
          total_credited: item.credited || 0,
          total_debited: item.used || 0,
          available_balance: item.balance || 0,
          pending_requests: 0,
          color: this.getLeaveTypeColor(item.leave_type_code)
        }));
        
        this.leaveBalances.set(mappedBalances);
        
        // Use summary data from API
        const summary = res?.data?.summary;
        if (summary) {
          this.totalBalance.set(summary.total_balance || 0);
          this.totalCredits.set(summary.total_credits || 0);
          this.totalDebits.set(summary.total_used || 0);
        } else {
          this.calculateStats();
        }
      },
      error: (err: any) => {
        console.error('Error fetching leave balance:', err);
        this._toastr.error(err?.error?.message || 'Failed to fetch leave balance');
      }
    });
  }

  calculateStats() {
    const balances = this.leaveBalances();
    const totalCredits = balances.reduce((sum, bal) => sum + bal.total_credited, 0);
    const totalDebits = balances.reduce((sum, bal) => sum + bal.total_debited, 0);
    const totalBalance = balances.reduce((sum, bal) => sum + bal.available_balance, 0);

    this.totalCredits.set(totalCredits);
    this.totalDebits.set(totalDebits);
    this.totalBalance.set(totalBalance);
  }

  applyFilters() {
    let filtered = this.ledgerEntries();

    // Date range filter
    filtered = filtered.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= this.startDate && entryDate <= this.endDate;
    });

    // Leave type filter
    if (this.selectedLeaveType !== 'All') {
      filtered = filtered.filter(entry => entry.leave_type === this.selectedLeaveType);
    }

    // Entry type filter
    if (this.selectedEntryType !== 'All') {
      filtered = filtered.filter(entry => entry.entry_type === this.selectedEntryType);
    }

    this.dataSource.data = filtered;
  }

  onDateChange() {
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  exportData() {
    this._toastr.info('Export functionality will be implemented');
  }

  getEntryTypeClass(type: string): string {
    const classes: any = {
      'CREDIT': 'entry-credit',
      'DEBIT': 'entry-debit',
      'REVERSAL': 'entry-reversal',
      'ADJUSTMENT': 'entry-adjustment'
    };
    return classes[type] || '';
  }

  getEntryTypeIcon(type: string): string {
    const icons: any = {
      'CREDIT': 'add_circle',
      'DEBIT': 'remove_circle',
      'REVERSAL': 'undo',
      'ADJUSTMENT': 'settings'
    };
    return icons[type] || 'help';
  }

  getLeaveTypeColor(code: string): string {
    const colors: any = {
      'CL': '#4caf50',
      'SL': '#ff9800',
      'PL': '#2196f3',
      'CO': '#9c27b0',
      'ML': '#e91e63',
      'LWP': '#f44336'
    };
    return colors[code] || '#607d8b';
  }

  handleBack() {
    this._location.back();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
