import { Component, inject, OnInit, signal } from '@angular/core';
import { MATERIAL } from '../../../shared/material/materials';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilsService } from '../../../core/services/utils.service';
import { HttpClientService } from '../../../core/services/http_client.service';
import { SubscriptionPlan, ApiResponse } from '../../../core/models/subscription-plan.model';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subscription-plan-create',
  imports: [MATERIAL, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './subscription-plan-create.html',
  styleUrl: './subscription-plan-create.scss',
})
export class SubscriptionPlanCreate implements OnInit {

  private utils = inject(UtilsService);
  private httpClient = inject(HttpClientService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private _toastr = inject(ToastrService)

  // Reactive Form
  planForm!: FormGroup;
  destroy$ = new Subject<void>();

  ngOnInit(): void {
    const token = this.utils.getSessionData();
    console.log('User Token:', token);
    this.initializeForm();
  }

  /**
   * Initialize reactive form with validation
   */
  initializeForm(): void {
    this.planForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      plan_code: ['', [Validators.required, Validators.pattern(/^[A-Z0-9_]+$/)]],
      monthlyPrice: [0, [Validators.required, Validators.min(1)]],
      yearlyPrice: [0, [Validators.required, Validators.min(1)]],
      employeeLimit: [0, [Validators.required, Validators.min(1)]],
      storageLimit: [0, [Validators.required, Validators.min(1)]],
      modules: this.fb.group({
        recruitment: [false],
        onboarding: [false],
        payroll: [false],
        performance: [false],
        learning: [false]
      })
    });
  }

  /**
   * Get modules form group
   */
  get modules() {
    return this.planForm.get('modules') as FormGroup;
  }

  /**
   * Check if at least one module is selected
   */
  isAtLeastOneModuleSelected(): boolean {
    return Object.values(this.modules.value).some((value: any) => value === true);
  }

  /**
   * Create subscription plan
   */
  createPlan(): void {
    if (!this.planForm.valid) {
      return;
    }
    if (!this.isAtLeastOneModuleSelected()) {
      return;
    }
    const planData: SubscriptionPlan = this.planForm.value;
    this.httpClient.post<ApiResponse<SubscriptionPlan>>(API_ENDPOINTS.subscription.create_plan, planData).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Plan created:', response.data);
          // this._toastr.success(response.msg)
          setTimeout(() => {
            this.router.navigate(['/home/platform-management/subscription-plan/subscription-plan-list']);
          }, 2000);
        } else {
        }
      },
      error: (error) => {
        console.error('Error creating plan:', error);
      }
    });
  }

  /**
   * Cancel and go back
   */
  cancel(): void {
    this.router.navigate(['/home/platform-management/subscription-plan/subscription-plan-list']);
  }

  /**
   * Reset form to initial state
   */
  resetForm(): void {
    this.planForm.reset({
      name: '',
      plan_code: '',
      monthlyPrice: 0,
      yearlyPrice: 0,
      employeeLimit: 0,
      storageLimit: 0,
      modules: {
        recruitment: false,
        onboarding: false,
        payroll: false,
        performance: false,
        learning: false
      }
    });
  }
}
