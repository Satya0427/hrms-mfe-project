import { Component, inject } from '@angular/core';
import { MATERIAL } from '../../../shared/material/materials';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SubscriptionPlanStatusDialog } from '../subscription-plan-status-dialog/subscription-plan-status-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-subscription-plan-list',
  imports: [MATERIAL, CommonModule, RouterModule],
  templateUrl: './subscription-plan-list.html',
  styleUrl: './subscription-plan-list.scss',
})
export class SubscriptionPlanList {
  private dialog = inject(MatDialog)
  displayedColumns = [
    'name',
    'pricing',
    'employees',
    'status',
    'created',
    'actions'
  ];

  plans = [
    {
      id: 'starter',
      name: 'Starter',
      monthlyPrice: 999,
      yearlyPrice: 9999,
      employees: 50,
      status: 'Active',
      created: new Date()
    },
    {
      id: 'growth',
      name: 'Growth',
      monthlyPrice: 2999,
      yearlyPrice: 29999,
      employees: 300,
      status: 'Active',
      created: new Date()
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      monthlyPrice: null,
      yearlyPrice: null,
      employees: 'Unlimited',
      status: 'Inactive',
      created: new Date()
    }
  ];

  openStatusDialog(plan: any) {
    const dialogRef = this.dialog.open(SubscriptionPlanStatusDialog, {
      width: '420px',
      data: {
        status: plan.status === 'Active' ? 'deactivate' : 'activate',
        planName: plan.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.confirmed) {
        plan.status =
          plan.status === 'Active' ? 'Inactive' : 'Active';

        // Later: backend API call
      }
    });
  }

}
