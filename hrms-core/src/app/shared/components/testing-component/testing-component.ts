import { Component, inject, OnInit, signal } from '@angular/core';
import { MATERIAL } from '../../material/materials';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentCollection } from '../../../freatures/employee/employee-list/document-collection/document-collection';

@Component({
  selector: 'app-testing-component',
  imports: [MATERIAL, CommonModule, FormsModule, ReactiveFormsModule, DocumentCollection],
  templateUrl: './testing-component.html',
  styleUrl: './testing-component.scss',
})
export class TestingComponent implements OnInit {

  private fb = inject(FormBuilder);

  previewUrl = signal<string | null>(null);

  // Tab State
  activeTab = signal<number>(0);

  // --- INDIVIDUAL FORM GROUPS ---
  personalDetails: FormGroup = this.fb.group({
    profileImage: [null],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    dob: [null],
    gender: ['male', Validators.required],
    address: [''],
    maritalStatus: [''],
    nationality: [''],
  });

  jobDetails: FormGroup = this.fb.group({
    designation_id: ['', Validators.required],
    department_id: ['', Validators.required],
    joiningDate: [new Date(), Validators.required],
    workEmail: ['', [Validators.required, Validators.email]],
    reported_to: [''],
    work_location: [''],
    workMode: [''],
    role_id: [''],
    probationEndDate: [null],
    probationStatus: [''],
    probationNotes: [''],
    employee_id: ['', Validators.required],
    employmentType: [''],
  });

  emergencyContactDetails: FormGroup = this.fb.group({
    contactName: [''],
    relation: [''],
    phone: ['']
  });

  bankAndDocDetails: FormGroup = this.fb.group({
    bankName: [''],
    accountNo: [''],
    ifsc: [''],
    pan: [''],
    aadhar: [''],
    aadharFile: [null],
    panFile: [null]
  });

  compensationDetails: FormGroup = this.fb.group({
    annualCtc: [600000, Validators.required], // Default 6L
    basicSalary: [{ value: 0, disabled: true }],
    hra: [{ value: 0, disabled: true }],
    specialAllowance: [{ value: 0, disabled: true }],
    pfDeduction: [{ value: 0, disabled: true }],
    profTax: [{ value: 200, disabled: true }],
    netSalary: [{ value: 0, disabled: true }]
  });




  constructor() {
    // Auto-calculate Salary Breakup when CTC changes
    this.compensationDetails.get('annualCtc')?.valueChanges.subscribe(ctc => {
      this.calculateSalaryBreakup(ctc);
    });

    // Initial Calc
    this.calculateSalaryBreakup(600000);
  }

  ngOnInit(): void {
    this.personalDetails.patchValue(EMPLOYEE_STATIC_DATA.personal);
    this.jobDetails.patchValue(EMPLOYEE_STATIC_DATA.job);
    this.emergencyContactDetails.patchValue(EMPLOYEE_STATIC_DATA.emergency);
    this.bankAndDocDetails.patchValue(EMPLOYEE_STATIC_DATA.bankAndDocs);
  }

  // --- LOGIC: Salary Calculation ---
  calculateSalaryBreakup(ctc: number) {
    if (!ctc) return;

    const monthlyGross = ctc / 12;
    const basic = monthlyGross * 0.40; // 40% of Gross
    const hra = basic * 0.50; // 50% of Basic
    const special = monthlyGross - (basic + hra); // Balancing figure

    const pf = basic * 0.12; // 12% of Basic
    const pt = 200; // Flat PT (Example)
    const net = monthlyGross - (pf + pt);

    this.compensationDetails.patchValue({
      basicSalary: Math.round(basic),
      hra: Math.round(hra),
      specialAllowance: Math.round(special),
      pfDeduction: Math.round(pf),
      profTax: pt,
      netSalary: Math.round(net)
    }, { emitEvent: false });
  }

  // --- LOGIC: File Upload ---
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.previewUrl.set(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  // --- API PAYLOAD CONSTRUCTION ---
  constructEmployeePayload() {
    const personal = this.personalDetails.value;
    const job = this.jobDetails.value;
    const emergency = this.emergencyContactDetails.value;
    const bank = this.bankAndDocDetails.value;

    // Constructing the specific JSON structure for API
    const apiPayload = {
      basicInfo: {
        firstName: personal.firstName,
        lastName: personal.lastName,
        personalEmail: personal.email,
        contactNumber: personal.phone,
        dob: personal.dob?.toISOString().split('T')[0], // YYYY-MM-DD
        gender: personal.gender,
        address: personal.address
      },
      employmentDetails: {
        role: job.designation,
        departmentId: job.department, // Assuming ID or Code
        dateOfJoining: job.joiningDate?.toISOString(),
        reportingManager: job.manager,
        officialEmail: job.workEmail
      },
      financialInfo: {
        bankName: bank.bankName,
        accountNumber: bank.accountNo,
        ifscCode: bank.ifsc,
        documents: {
          pan: bank.pan,
          aadhar: bank.aadhar
        }
      },
      emergencyContact: {
        name: emergency.contactName,
        relationship: emergency.relation,
        phone: emergency.phone
      }
    };

    console.log('Constructed API Payload:', JSON.stringify(apiPayload, null, 2));
    alert('Payload generated! Check Console.');
    return apiPayload;
  }
}

const EMPLOYEE_STATIC_DATA = {
  personal: {
    profileImage: null, // or 'https://example.com/profile.jpg'
    firstName: 'Ravi',
    lastName: 'Kumar',
    email: 'ravi.kumar@gmail.com',
    phone: '9876543210',
    dob: new Date('1995-08-15'),
    gender: 'male',
    address: 'Flat 302, Green Meadows, Madhapur, Hyderabad, Telangana',
    maritalStatus: 'single'
  },

  job: {
    designation: 'Software Engineer',
    department: 'Engineering',
    joiningDate: new Date('2024-06-01'),
    workEmail: 'ravi.kumar@company.com',
    manager: 'Suresh Reddy',
    location: 'Hyderabad'
  },

  emergency: {
    contactName: 'Lakshmi Kumar',
    relation: 'Mother',
    phone: '9123456789'
  },

  bankAndDocs: {
    bankName: 'HDFC Bank',
    accountNo: '50200123456789',
    ifsc: 'HDFC0001234',
    pan: 'ABCDE1234F',
    aadhar: '123412341234'
  }
};

