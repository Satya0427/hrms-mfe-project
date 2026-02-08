import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MATERIAL } from '../../../shared/material/materials';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LeaveTypeDialog } from '../../../shared/dialogs/leave-type-dialog/leave-type-dialog';
import { HeaderTab, PageHeader } from '../../../shared/components/page-header/page-header';

// --- 1. INTERFACE ---
export interface LeaveType {
  id: number;
  code: string;       // CL, SL
  name: string;       // Casual Leave
  description?: string;
  category: 'Paid' | 'Unpaid';
  colorCode: string;  // Hex color
  isSystem: boolean;  // True for LOP (cannot delete)
  isActive: boolean;
}

@Component({
  selector: 'app-leave-type-config',
  imports: [MATERIAL, FormsModule, ReactiveFormsModule, CommonModule, PageHeader],
  templateUrl: './leave-type-config.html',
  styleUrl: './leave-type-config.scss',
})
export class LeaveTypeConfig implements OnInit {

  // Define tabs configuration
  pageTabs: HeaderTab[] = [
    { id: 'details', label: 'Personal Details' },
    { id: 'documents', label: 'Documents' },
    { id: 'history', label: 'Job History' }
  ];

  // Signal for the active tab (defaults to first one)
  currentTab = signal<string | number>('details');

  dialog = inject(MatDialog);

  // Table Columns
  displayedColumns: string[] = ['color', 'identity', 'category', 'status', 'actions'];

  // Data Source
  dataSource = new MatTableDataSource<LeaveType>([]);

  // Mock Data Signal
  leaveTypes = signal<LeaveType[]>([
    { id: 1, code: 'CL', name: 'Casual Leave', category: 'Paid', colorCode: '#10b981', isSystem: false, isActive: true, description: 'For personal matters' },
    { id: 2, code: 'SL', name: 'Sick Leave', category: 'Paid', colorCode: '#f59e0b', isSystem: false, isActive: true, description: 'Medical reasons' },
    { id: 3, code: 'EL', name: 'Earned Leave', category: 'Paid', colorCode: '#3f51b5', isSystem: false, isActive: true, description: 'Privilege leave earned over time' },
    { id: 4, code: 'LOP', name: 'Loss Of Pay', category: 'Unpaid', colorCode: '#ef4444', isSystem: true, isActive: true, description: 'Unpaid leave deduction' },
  ]);

  ngOnInit() {
    this.dataSource.data = this.leaveTypes();
  }

  openDialog(leave?: LeaveType) {
    const dialogRef = this.dialog.open(LeaveTypeDialog, {
      width: '500px',
      data: leave || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          // Edit Logic
          this.leaveTypes.update(leaves => leaves.map(l => l.id === result.id ? result : l));
        } else {
          // Create Logic
          const newId = Math.max(...this.leaveTypes().map(l => l.id)) + 1;
          this.leaveTypes.update(leaves => [...leaves, { ...result, id: newId }]);
        }
        this.dataSource.data = this.leaveTypes();
      }
    });
  }

  toggleStatus(leave: LeaveType) {
    if (leave.isSystem) return; // Prevent disabling system leaves if required by business logic

    this.leaveTypes.update(leaves =>
      leaves.map(l => l.id === leave.id ? { ...l, isActive: !l.isActive } : l)
    );
    this.dataSource.data = this.leaveTypes();
  }
}
