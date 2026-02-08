import { Component, inject, signal } from '@angular/core';
import { LeavePolicy } from '../../../../core/models/leave.models';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MATERIAL } from '../../../../shared/material/materials';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-policy',
  imports: [MATERIAL, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-policy.html',
  styleUrl: './create-policy.scss',
})
export class CreatePolicy {
  private fb = inject(FormBuilder);

  // Available Leave Types in the System (Fetch from API in real app)
  availableLeaveTypes = signal(['Casual Leave (CL)', 'Sick Leave (SL)', 'Earned Leave (EL)', 'Loss of Pay (LOP)']);

  // Main Form Group
  policyForm: FormGroup = this.fb.group({
    basicInfo: this.fb.group({
      policyName: ['', Validators.required],
      description: [''],
      effectiveFrom: [new Date(), Validators.required],
      effectiveTo: [null],
      status: ['Draft', Validators.required]
    }),
    applicability: this.fb.group({
      employeeType: ['All', Validators.required],
      gender: ['All', Validators.required],
      maritalStatus: ['All', Validators.required],
      probation: [true],
      noticePeriod: [false]
    }),
    selectedLeaves: [[], Validators.required], // Used to generate the Rule Blocks
    leaveRules: this.fb.array([]), // Dynamic Form Array
    sandwichRule: this.fb.group({
      isApplicable: [false],
      countWeeklyOffs: [false],
      countHolidays: [false]
    })
  });

  // Helper to access FormArray
  get leaveRulesArray() {
    return this.policyForm.get('leaveRules') as FormArray;
  }

  // Logic: When user selects leaves in Step 2, generate blocks for Step 3
  onLeaveSelectionChange(selectedTypes: string[]) {
    this.leaveRulesArray.clear();

    selectedTypes.forEach(type => {
      // Create a FormGroup for EACH selected leave type
      const ruleGroup = this.fb.group({
        leaveType: [type], // Readonly identifier
        credit: this.fb.group({
          frequency: ['Monthly'],
          amount: [1],
          maxBalance: [12]
        }),
        restrictions: this.fb.group({
          maxPerMonth: [2],
          minPerRequest: [0.5],
          maxPerRequest: [3],
          allowHalfDay: [true],
          allowNegative: [false]
        }),
        approval: this.fb.group({
          requireApproval: [true],
          autoApprove: [false],
          docRequired: [false],
          docAfterDays: [3]
        }),
        yearEnd: this.fb.group({
          allowCarryForward: [true],
          maxCarryForward: [5],
          allowEncashment: [false],
          maxEncashment: [0]
        })
      });

      this.leaveRulesArray.push(ruleGroup);
    });
  }


  // Submit API Call
  savePolicy() {
    if (this.policyForm.valid) {
      const payload: LeavePolicy = this.policyForm.value;
      console.log('🔥🔥 Constructed API Payload:', JSON.stringify(payload, null, 2));
      alert('Policy Saved! Check Console for JSON.');
      // HttpClient.post('/api/leave-policies', payload).subscribe(...)
    } else {
      this.policyForm.markAllAsTouched();
      alert('Please fix errors before saving.');
    }
  }
}
