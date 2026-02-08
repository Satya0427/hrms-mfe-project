import { Component, signal } from '@angular/core';
import { MATERIAL } from '../../../shared/material/materials';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-leave-policy-list',
  imports: [MATERIAL, CommonModule, FormsModule, RouterModule],
  templateUrl: './leave-policy-list.html',
  styleUrl: './leave-policy-list.scss',
})
export class LeavePolicyList {
  displayedColumns = ['name', 'applicability', 'types', 'status', 'actions'];
  // Mock Data matching your requirements
  policies = signal<any[]>([
    {
      basicInfo: { policyName: 'Default Policy', effectiveFrom: '2024-01-01', status: 'Active' },
      applicability: { employeeType: 'All' },
      leaveRules: [{ leaveType: 'CL' }, { leaveType: 'SL' }, { leaveType: 'EL' }]
    }
  ]);

  createNew() {
    console.log('Navigate to Create Screen');
    // this.router.navigate(['/leave/policy/create']);
  }
}
