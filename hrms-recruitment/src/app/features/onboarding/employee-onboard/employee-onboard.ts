import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { MATERIAL } from '../../../shared/material/materials';
import { CommonModule } from '@angular/common';
import { HttpClientService } from '../../../core/services/http_client.service';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-onboard',
  imports: [MATERIAL, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './employee-onboard.html',
  styleUrl: './employee-onboard.scss',
})
export class EmployeeOnboard {
  private _fb = inject(FormBuilder);
  private _httpClient = inject(HttpClientService);
  private _toastr = inject(ToastrService);

  employeeForm: FormGroup = this._fb.group({
    profile: this._fb.group({
      employee_code: ['', Validators.required],
      joining_date: [null, Validators.required],
      confirmation_date: [null],
      employment_type: ['PERMANENT'],
      work_location: ['', Validators.required],
      work_mode: ['WFO'],
      status: ['ACTIVE']
    }),
    personal: this._fb.group({
      dob: [null, Validators.required],
      gender: ['', Validators.required],
      marital_status: ['SINGLE'],
      blood_group: [''],
      nationality: [''],
      personal_email: ['', [Validators.email]]
    }),
    job: this._fb.group({
      department_id: ['', Validators.required],
      designation_id: ['', Validators.required],
      manager_id: [null],
      grade: [''],
      cost_center: ['']
    }),
    payroll: this._fb.group({
      ctc: [0, Validators.required],
      bank_name: [''],
      account_number: [''],
      ifsc_code: ['']
    }),
    compliance: this._fb.group({
      pan_number: [''],
      aadhaar_number: [''],
      uan_number: ['']
    }),
    emergency: this._fb.array([])
  });

  get emergencyControls() {
    return this.employeeForm.get('emergency') as FormArray;
  }

  addEmergency() {
    const group = this._fb.group({
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
    if (!this.employeeForm.valid) {
      this.employeeForm.markAllAsTouched();
      this._toastr.error('Please fill all the required fields');
      return;
    }
    const formValue = this.employeeForm.value;

    // Construct payload matching user request
    const payload = {
      user_id: 'user_placeholder', // TODO: Get from auth/context
      organization_id: 'org_placeholder', // TODO: Get from auth/context
      employee_code: formValue.profile.employee_code,
      joining_date: formValue.profile.joining_date,
      employment_type: formValue.profile.employment_type,
      work_mode: formValue.profile.work_mode,
      status: formValue.profile.status,
      personal_email: formValue.personal.personal_email,
      date_of_birth: formValue.personal.dob,
      gender: formValue.personal.gender,
      manager_id: formValue.job.manager_id,
      grade: formValue.job.grade,
      cost_center: formValue.job.cost_center,
      annual_ctc: formValue.payroll.ctc,
      bank_name: formValue.payroll.bank_name,
      account_number: formValue.payroll.account_number,
      ifsc_code: formValue.payroll.ifsc_code,
      pan_number: formValue.compliance.pan_number,
      aadhaar_number: formValue.compliance.aadhaar_number,
      uan_number: formValue.compliance.uan_number
    };
    console.log("Final Payload:", payload);
    this._httpClient.post(API_ENDPOINTS.onboarding.employee_onboard, payload).subscribe({
      next: (res: any) => {
        console.log('Employee onboarded successfully', res);
        // Handle success (e.g., navigate away or show snackbar)
      },
      error: (err: any) => {
        console.error('Error onboarding employee', err);
        // Handle error
      }
    });
  }
}
