import { Routes } from "@angular/router";
import { OnboadingEmployee } from "./onboading-employee/onboading-employee";
import { Employee } from "./employee";

export const EMPLOYEE_ROUTES: Routes = [
    {
        path: 'employee', component: Employee, children: [
            { path: '', redirectTo: 'onboading-employee', pathMatch: 'full' },
            { path: 'onboading-employee', component: OnboadingEmployee },
            { path: '**', redirectTo: 'onboading-employee', },
        ]
    },
    { path: '', redirectTo: 'employee/onboading-employee', pathMatch: 'full' },
    { path: '**', redirectTo: 'employee', },
];