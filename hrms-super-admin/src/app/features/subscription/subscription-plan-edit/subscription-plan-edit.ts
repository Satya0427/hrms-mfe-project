import { Component } from '@angular/core';
import { MATERIAL } from '../../../shared/material/materials';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subscription-plan-edit',
  imports: [MATERIAL,CommonModule,RouterModule,FormsModule],
  templateUrl: './subscription-plan-edit.html',
  styleUrl: './subscription-plan-edit.scss',
})
export class SubscriptionPlanEdit {
  plan = {
    name: 'Growth',
    code: 'GROWTH',
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
    }
  };
}
