import { Routes } from '@angular/router';
import { Employee } from './employee';
import { EmployeeList } from './employee-list/employee-list';
import { EmployeeOnboarding } from './employee-list/employee-onboarding/employee-onboarding';
import { TestingComponent } from '../../shared/components/testing-component/testing-component';
// import { Recruitment } from './features/recruitment/recruitment';

export const EMPLOYEE_ROUTES: Routes = [
    {
        path: '', component: Employee, children: [
            { path: 'employee-list', component: EmployeeList },
            { path: 'employee-onboarding', component: TestingComponent },
            { path: '', redirectTo: 'employee-list', pathMatch: 'full', },
            { path: '**', redirectTo: 'employee-list', },
        ]
    },
    { path: '', redirectTo: 'employee', pathMatch: 'full', },
    { path: '**', redirectTo: 'employee', },
];