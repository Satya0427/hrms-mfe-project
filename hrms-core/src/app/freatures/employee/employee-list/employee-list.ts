import { Component, inject, ViewChild } from '@angular/core';
import { MATERIAL } from '../../../shared/material/materials';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DynamicFieldsDialog, FieldConfig } from '../../../shared/components/dynamic-fields-dialog/dynamic-fields-dialog';
import { Validators } from '@angular/forms';
import { ApiClient } from '../../../core/services/api-client.service';
import { Subject, takeUntil } from 'rxjs';
import { API_ENDPOINTS } from '../../../core/config/api-endpoints';
import { CommonService } from '../../../core/services/common.service';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-employee-list',
  imports: [MATERIAL, CommonModule, RouterModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
})
export class EmployeeList {
  private dialog = inject(MatDialog);
  private _httpClient = inject(ApiClient);
  private _commonService = inject(CommonService);

  fieldsConfig: FieldConfig[] = [
    // ================= PROFILE DETAILS =================
    { controlName: 'profile_heading', label: 'Profile Details', type: 'heading' },
    {
      controlName: 'employee_code',
      label: 'Employee Code',
      type: 'text',
      icon: 'badge',
      width: 'half',
      disabled: true
    },
    {
      controlName: 'joining_date',
      label: 'Joining Date*',
      type: 'date',
      icon: 'calendar_today',
      width: 'half',
      validators: [Validators.required]
    },
    {
      controlName: 'confirmation_date',
      label: 'Confirmation Date',
      type: 'date',
      icon: 'event_available',
      width: 'half'
    },
    {
      controlName: 'employment_type',
      label: 'Employment Type',
      type: 'select',
      options: [],
      width: 'half'
    },
    {
      controlName: 'work_location',
      label: 'Work Location',
      type: 'text',
      icon: 'location_city',
      width: 'half'
    },
    {
      controlName: 'work_mode',
      label: 'Work Mode',
      type: 'select',
      options: [],
      width: 'half'
    },
    {
      controlName: 'status',
      label: 'Employment Status',
      type: 'select',
      options: [],
      width: 'half'
    },

    // ================= PERSONAL DETAILS =================
    { controlName: 'personal_heading', label: 'Personal Details', type: 'heading' },
    {
      controlName: 'dob',
      label: 'Date of Birth*',
      type: 'date',
      icon: 'cake',
      width: 'half',
      validators: [Validators.required]
    },
    {
      controlName: 'gender',
      label: 'Gender*',
      type: 'select',
      options: [],
      width: 'half',
      validators: [Validators.required]
    },
    {
      controlName: 'marital_status',
      label: 'Marital Status',
      type: 'select',
      options: ['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'],
      width: 'half'
    },
    {
      controlName: 'blood_group',
      label: 'Blood Group',
      type: 'text',
      width: 'half'
    },
    {
      controlName: 'nationality',
      label: 'Nationality',
      type: 'text',
      width: 'half'
    },
    {
      controlName: 'personal_email',
      label: 'Personal Email*',
      type: 'email',
      icon: 'email',
      width: 'half',
      validators: [Validators.required, Validators.email]
    },

    // ================= JOB DETAILS =================
    { controlName: 'job_heading', label: 'Job Details', type: 'heading' },
    {
      controlName: 'department_id',
      label: 'Department',
      type: 'text', // Later can be select
      width: 'half'
    },
    {
      controlName: 'designation_id',
      label: 'Designation',
      type: 'text',
      width: 'half'
    },
    {
      controlName: 'manager_id',
      label: 'Manager',
      type: 'text',
      width: 'half'
    },
    {
      controlName: 'grade',
      label: 'Grade',
      type: 'text',
      width: 'half'
    },
    {
      controlName: 'cost_center',
      label: 'Cost Center',
      type: 'text',
      width: 'half'
    },

    // ================= EMERGENCY DETAILS =================
    { controlName: 'emergency_heading', label: 'Emergency Contact', type: 'heading' },
    {
      controlName: 'emergency_name',
      label: 'Contact Name',
      type: 'text',
      icon: 'person',
      width: 'half'
    },
    {
      controlName: 'emergency_relation',
      label: 'Relation',
      type: 'text',
      width: 'half'
    },
    {
      controlName: 'emergency_phone',
      label: 'Phone Number',
      type: 'text',
      icon: 'phone',
      width: 'half'
    },
    {
      controlName: 'emergency_address',
      label: 'Address',
      type: 'textarea',
      width: 'full'
    }
  ];


  displayedColumns: string[] = ['select', 'name', 'role', 'department', 'mobile', 'joiningDate', 'email', 'gender', 'address'];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  destroy$ = new Subject<void>();

  ngOnInit() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.name.toLowerCase().includes(filter) ||
        data.email.toLowerCase().includes(filter) ||
        data.role.toLowerCase().includes(filter);
    };
    this.loadLookupData();
    this.getEmployee();
  }

  async loadLookupData() {
    const categories = API_ENDPOINTS.lookup.categories;
    const lookupData = await this._commonService.getBulkLookupData([
      categories.gender,
      categories.employee_type,
      categories.work_mode,
      categories.status
    ]);

    if (lookupData) {
      this.updateFieldOptions('gender', lookupData[categories.gender]);
      this.updateFieldOptions('employment_type', lookupData[categories.employee_type]);
      this.updateFieldOptions('work_mode', lookupData[categories.work_mode]);
      this.updateFieldOptions('status', lookupData[categories.status]);
    }
  }

  private updateFieldOptions(controlName: string, options: any[]) {
    const field = this.fieldsConfig.find(f => f.controlName === controlName);
    if (field && options) {
      field.options = options;
    }
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // openEmployeePopup() {
  //   const dialogRef = this.dialog.open(DynamicFieldsDialog, {
  //     width: '900px',
  //     maxWidth: '90vw',
  //     panelClass: 'dynamic-dialog-panel',
  //     disableClose: true,
  //     data: {
  //       title: 'New Employee',
  //       fields: this.fieldsConfig,
  //       onSave: (result: any) => this.saveEmployee(result)
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       // Handle post-success logic here if needed (e.g., refresh list)
  //       this.loadEmployees();
  //     }
  //   });
  // }

  getEmployee() {
    const payload = {
      page: 1,
      limit: 10,
      // status: '',
      // employment_type: '',
      search_key: ''
    }
    this._httpClient.post(API_ENDPOINTS.employee.get, payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        if (res.sts === 200 && res.data?.emp_list) {
          // Map API response to table format if field names differ
          const mappedData = res.data.emp_list.map((emp: any) => ({
            ...emp,
            name: `${emp.first_name} ${emp.last_name}`.trim() || 'N/A',
            email: emp.email,
            joiningDate: emp.joining_date,
            mobile: emp.account_last4 ? `***${emp.account_last4}` : 'N/A',
            role: emp.designation || 'N/A',
            department: emp.department || 'N/A',
            gender: emp.gender || 'N/A',
            address: emp.work_location || 'N/A',
            avatar: `https://i.pravatar.cc/150?seed=${emp.first_name}${emp.last_name}`
          }));
          this.dataSource.data = mappedData;
          console.log(this.dataSource.data);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
