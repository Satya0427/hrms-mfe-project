import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MATERIAL } from '../../../shared/material/materials';

@Component({
  selector: 'app-subscription-plan-view',
  imports: [RouterModule,CommonModule,MATERIAL],
  templateUrl: './subscription-plan-view.html',
  styleUrl: './subscription-plan-view.scss',
})
export class SubscriptionPlanView {
  plan = {
    name: 'Growth',
    code: 'GROWTH',
    status: 'Active',
    monthlyPrice: 2999,
    yearlyPrice: 29999,
    employeeLimit: 300,
    storageLimit: 50,
    modules: {
      recruitment: true,
      onboarding: true,
      payroll: false,
      performance: false,
      learning: false
    },
    createdOn: '10 Jan 2026'
  };
}
