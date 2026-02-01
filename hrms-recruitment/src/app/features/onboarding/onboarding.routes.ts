import { Routes } from "@angular/router";
import { Onboarding } from "./onboarding";
import { EmployeeOnboard } from "./employee-onboard/employee-onboard";

export const onboardingRoutes: Routes = [
    {
        path: '', component: Onboarding,
        children: [
            {
                path: 'employee-onboard',component:EmployeeOnboard,
                
            },
            {
                path:'',redirectTo:'employee-onboard',pathMatch:'full'
            }
        ]
    }
];
