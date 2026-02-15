import { Routes } from "@angular/router";

export const PAYROLL_MODULE_ROUTES: Routes = [
    {
        path: '', loadComponent: () => import('./payroll-module').then(m => m.PayrollModule),
        children: [
            { path: 'components', loadComponent: () => import('./payroll-structure/payroll-components/payroll-components').then(m => m.PayrollComponents) },
            { path: 'templates', loadComponent: () => import('./payroll-structure/payroll-templates/payroll-templates').then(m => m.PayrollTemplates) },
            { path: 'templates/create', loadComponent: () => import('./payroll-structure/payroll-templates/create-template/create-template').then(m => m.CreateTemplate) },
            { path: 'templates/edit/:id', loadComponent: () => import('./payroll-structure/payroll-templates/create-template/create-template').then(m => m.CreateTemplate) },
            { path: 'employee-assignment', loadComponent: () => import('./payroll-structure/employee-assignment/employee-assignment').then(m => m.EmployeeAssignment) },
            { path: '', redirectTo: 'components', pathMatch: 'full' }
        ]
    },
]