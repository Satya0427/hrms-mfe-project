import { Routes } from '@angular/router';

export const HRMS_CORE_ROUTES: Routes = [
    { path: '', redirectTo: 'employee', pathMatch: 'full', },
    { path: 'employees', loadChildren: () => import('./freatures/employee/employee.router').then(m => m.EMPLOYEE_ROUTES), },
    { path: 'leave', loadChildren: () => import('./freatures/leave-management/leave-management.router').then(m => m.LEAVE_ROUTES), },
    { path: 'attendance', loadChildren: () => import('./freatures/attendance/attendance.router').then(m => m.ATTENDANCE_ROUTES), },
    {path: 'requests', loadChildren: () => import('./freatures/requests/request.router').then(m => m.REQUEST_ROUTER), },
    {path: 'payroll', loadChildren: () => import('./freatures/payroll_module/payroll-module.router').then(m => m.PAYROLL_MODULE_ROUTES), },
    { path: '**', redirectTo: 'employee', },
];
