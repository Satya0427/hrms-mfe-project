import { Routes } from '@angular/router';
// import { Recruitment } from './features/recruitment/recruitment';

export const HRMS_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'employee',
        pathMatch: 'full',
    },
    {
        path: 'employee',
        loadChildren: () =>
            import('./features/employee/employee.router')
                .then(m => m.EMPLOYEE_ROUTES),
    },
    {
        path: '**',
        redirectTo: 'employee',
    },
];
