import { Component, signal, inject, OnInit, OnDestroy, output } from '@angular/core';
import { ApiClient } from '../../../../core/services/api-client.service';
import { MATERIAL } from '../../../../shared/material/materials';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api-endpoints';
import { environment } from '../../../../../environments/environment.dev';
import { RouterLink } from "@angular/router";

export interface Employee {
  _id: string;
  emp_id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  mobile: string;
  joiningDate: Date | null;
  gender: string;
  address: string;
  avatar: string;
}
@Component({
  selector: 'app-employee-list',
  imports: [MATERIAL, CommonModule, FormsModule, RouterLink],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
})
export class EmployeeList {
  private _httpClient = inject(ApiClient);
  private destroy$ = new Subject<void>();

  // Data
  employees = signal<Employee[]>([]);
  searchKey = '';

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    const payload = {
      page: 1,
      limit: 50,
      search_key: this.searchKey
    };
    this._httpClient.post(API_ENDPOINTS.employee.get, payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        if (res.sts === 200 && res.data?.data) {
          const mappedData: Employee[] = res.data.data.map((emp: any) => ({
            _id: emp._id,
            emp_id: emp.job_details?.employee_id || 'N/A',
            name: emp.personal_details
              ? `${emp.personal_details.firstName || ''} ${emp.personal_details.lastName || ''}`.trim()
              : 'N/A',
            email: emp.job_details?.workEmail || emp.personal_details?.email || 'N/A',
            role: emp.job_details?.department_name || 'N/A',
            department: emp.job_details?.department_id || 'N/A',
            mobile: emp.personal_details?.phone || 'N/A',
            joiningDate: emp.job_details?.joiningDate || null,
            gender: emp.personal_details?.gender || 'N/A',
            address: emp.personal_details?.address || 'N/A',
            avatar: emp?.profileImageUrl
              ? `${environment.apiUrl}${emp.profileImageUrl}`
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.personal_details?.firstName || 'Emp')}&background=random`
          }));
          this.employees.set(mappedData);
        }
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
      }
    });
  }

  onSearch() {
    this.loadEmployees();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
