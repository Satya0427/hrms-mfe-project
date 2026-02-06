import { Routes } from "@angular/router";
import { Onboarding } from "../../features/onboarding/onboarding";
import { EmployeeOnboard } from "../../features/onboarding/employee-onboard/employee-onboard";

export const onboardingRoutes: Routes = [
    {
        path: '', component: Onboarding,
        children: [
            {
                path: 'employee-onboard', component: EmployeeOnboard,

            },
            {
                path: '', redirectTo: 'employee-onboard', pathMatch: 'full'
            }
        ]
    }
];
