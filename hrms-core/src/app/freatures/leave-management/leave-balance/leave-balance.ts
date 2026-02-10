import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { MATERIAL } from '../../../shared/material/materials';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { CommonService } from '../../../core/services/common.service';
import { ApiClient } from '../../../core/services/api-client.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { EmployeeListSelector, Employee } from './employee-list-selector/employee-list-selector';

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
  imports: [MATERIAL, CommonModule, FormsModule, PageHeader, EmployeeListSelector],
  templateUrl: './leave-balance.html',
  styleUrl: './leave-balance.scss',
})
export class LeaveBalance implements OnInit, OnDestroy {
  private _commonService = inject(CommonService);
  private _location = inject(Location);
  private _httpClient = inject(ApiClient);
  private _toastr = inject(ToastrService);
  private destroy$ = new Subject<void>();

  currentTab: string | number | null = null;
  pageTabs: any[] = [];

  // Filters
  selectedEmployeeId = signal<string | null>(null);
  selectedEmployee = signal<Employee | null>(null);
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

  async ngOnInit() {
    this.pageTabs = await this._commonService.getTabs('LEAVE_ADMIN');
    if (this.pageTabs.length > 0) {
      this.currentTab = this.pageTabs[4]?.key || null; // Leave Balance tab
    }
  }

  onEmployeeSelected(employee: Employee) {
    this.selectedEmployee.set(employee);
    this.selectedEmployeeId.set(employee._id);
    this.loadLeaveBalance();
    this.loadLedgerEntries();
  }

  onEmployeeCleared() {
    this.selectedEmployee.set(null);
    this.selectedEmployeeId.set(null);
    this.leaveBalances.set([]);
    this.ledgerEntries.set([]);
    this.dataSource.data = [];
  }

  loadLeaveBalance() {
    if (!this.selectedEmployeeId()) return;

    // Mock balance data - replace with actual API call
    const mockBalances: ILeaveBalance[] = [
      {
        leave_type_id: 'LT001',
        leave_type_name: 'Casual Leave',
        leave_type_code: 'CL',
        total_credited: 12,
        total_debited: 5,
        available_balance: 7,
        pending_requests: 0,
        color: '#4caf50'
      },
      {
        leave_type_id: 'LT002',
        leave_type_name: 'Sick Leave',
        leave_type_code: 'SL',
        total_credited: 10,
        total_debited: 3,
        available_balance: 7,
        pending_requests: 2,
        color: '#ff9800'
      },
      {
        leave_type_id: 'LT003',
        leave_type_name: 'Privilege Leave',
        leave_type_code: 'PL',
        total_credited: 15,
        total_debited: 8,
        available_balance: 7,
        pending_requests: 0,
        color: '#2196f3'
      },
      {
        leave_type_id: 'LT004',
        leave_type_name: 'Comp Off',
        leave_type_code: 'CO',
        total_credited: 4,
        total_debited: 2,
        available_balance: 2,
        pending_requests: 0,
        color: '#9c27b0'
      }
    ];

    this.leaveBalances.set(mockBalances);
    this.calculateStats();
  }

  loadLedgerEntries() {
    if (!this.selectedEmployeeId()) return;

    // Mock ledger data - replace with actual API call
    const mockEntries: LedgerEntry[] = [
      {
        _id: '1',
        date: new Date('2024-01-01'),
        leave_type: 'Casual Leave',
        entry_type: 'CREDIT',
        quantity: 12,
        balance_after: 12,
        reference_type: 'POLICY',
        remarks: 'Annual credit as per policy'
      },
      {
        _id: '2',
        date: new Date('2024-02-15'),
        leave_type: 'Casual Leave',
        entry_type: 'DEBIT',
        quantity: -2,
        balance_after: 10,
        reference_type: 'LEAVE_REQUEST',
        reference_id: 'LR001',
        remarks: 'Leave availed'
      },
      {
        _id: '3',
        date: new Date('2024-01-01'),
        leave_type: 'Sick Leave',
        entry_type: 'CREDIT',
        quantity: 10,
        balance_after: 10,
        reference_type: 'POLICY',
        remarks: 'Annual credit as per policy'
      },
      {
        _id: '4',
        date: new Date('2024-03-10'),
        leave_type: 'Casual Leave',
        entry_type: 'DEBIT',
        quantity: -3,
        balance_after: 7,
        reference_type: 'LEAVE_REQUEST',
        reference_id: 'LR002',
        remarks: 'Medical leave'
      },
      {
        _id: '5',
        date: new Date('2024-01-01'),
        leave_type: 'Privilege Leave',
        entry_type: 'CREDIT',
        quantity: 15,
        balance_after: 15,
        reference_type: 'POLICY',
        remarks: 'Annual credit'
      },
      {
        _id: '6',
        date: new Date('2024-04-05'),
        leave_type: 'Privilege Leave',
        entry_type: 'DEBIT',
        quantity: -5,
        balance_after: 10,
        reference_type: 'LEAVE_REQUEST',
        reference_id: 'LR003',
        remarks: 'Vacation'
      },
      {
        _id: '7',
        date: new Date('2024-05-20'),
        leave_type: 'Comp Off',
        entry_type: 'CREDIT',
        quantity: 2,
        balance_after: 2,
        reference_type: 'ADMIN',
        remarks: 'Comp off for weekend work'
      },
      {
        _id: '8',
        date: new Date('2024-06-01'),
        leave_type: 'Sick Leave',
        entry_type: 'ADJUSTMENT',
        quantity: -1,
        balance_after: 9,
        reference_type: 'ADMIN',
        remarks: 'Adjustment - LOP conversion'
      }
    ];

    this.ledgerEntries.set(mockEntries);
    this.dataSource.data = mockEntries;
    this.applyFilters();
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

  refreshData() {
    if (this.selectedEmployeeId()) {
      this.loadLeaveBalance();
      this.loadLedgerEntries();
      this._toastr.success('Data refreshed successfully');
    }
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

  handleBack() {
    this._location.back();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
