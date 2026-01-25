import { Component } from '@angular/core';
import { MATERIAL } from '../../../shared/material/materials';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-subscription-plan-create',
  imports: [MATERIAL, CommonModule, FormsModule, RouterLink],
  templateUrl: './subscription-plan-create.html',
  styleUrl: './subscription-plan-create.scss',
})
export class SubscriptionPlanCreate {

  plan = {
    name: '',
    code: '',
    monthlyPrice: null,
    yearlyPrice: null,
    employeeLimit: null,
    storageLimit: null,
    modules: {
      recruitment: true,
      onboarding: false,
      payroll: false,
      performance: false,
      learning: false
    }
  };
}
