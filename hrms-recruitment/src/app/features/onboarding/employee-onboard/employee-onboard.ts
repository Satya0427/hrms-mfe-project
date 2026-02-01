import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MATERIAL } from '../../../shared/material/materials';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-onboard',
  imports: [MATERIAL, FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './employee-onboard.html',
  styleUrl: './employee-onboard.scss',
})
export class EmployeeOnboard {
   employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      profile: this.fb.group({
        employee_code: ['', Validators.required],
        joining_date: [null, Validators.required],
        confirmation_date: [null],
        employment_type: ['PERMANENT'],
        work_location: ['', Validators.required],
        work_mode: ['WFO'],
        status: ['ACTIVE']
      }),
      personal: this.fb.group({
        dob: [null, Validators.required],
        gender: ['', Validators.required],
        marital_status: ['SINGLE'],
        blood_group: [''],
        nationality: [''],
        personal_email: ['', [Validators.email]]
      }),
      job: this.fb.group({
        department_id: ['', Validators.required],
        designation_id: ['', Validators.required],
        manager_id: [null],
        grade: [''],
        cost_center: ['']
      }),
      payroll: this.fb.group({
        ctc: [0, Validators.required],
        bank_name: [''],
        account_number: [''],
        ifsc_code: ['']
      }),
      compliance: this.fb.group({
        pan_number: [''],
        aadhaar_number: [''],
        uan_number: ['']
      }),
      emergency: this.fb.array([])
    });
  }

  get emergencyControls() {
    return this.employeeForm.get('emergency') as FormArray;
  }

  addEmergency() {
    const group = this.fb.group({
      name: ['', Validators.required],
      relation: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['']
    });
    this.emergencyControls.push(group);
  }

  removeEmergency(index: number) {
    this.emergencyControls.removeAt(index);
  }

  submit() {
    if (this.employeeForm.valid) {
      console.log("Final Payload:", this.employeeForm.value);
    }
  }
}
