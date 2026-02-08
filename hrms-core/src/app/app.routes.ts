import { Routes } from '@angular/router';

export const HRMS_CORE_ROUTES: Routes = [
    { path: '', redirectTo: 'employee', pathMatch: 'full', },
    { path: 'employees', loadChildren: () => import('./freatures/employee/employee.router').then(m => m.EMPLOYEE_ROUTES), },
    { path: 'leave', loadChildren: () => import('./freatures/leave-management/leave-management.router').then(m => m.LEAVE_ROUTES), },
    { path: '**', redirectTo: 'employee', },
];
