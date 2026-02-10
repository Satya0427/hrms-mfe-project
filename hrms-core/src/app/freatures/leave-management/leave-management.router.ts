import { Routes } from '@angular/router';
import { LeaveManagement } from './leave-management';
import { LeaveTypeConfig } from './leave-type-config/leave-type-config';
import { LeavePolicyList } from './leave-policy-list/leave-policy-list';
import { CreatePolicy } from './leave-policy-list/create-policy/create-policy';
import { HolidayCalendar } from './holiday-calendar/holiday-calendar';
import { LeaveSimulation } from './leave-simulation/leave-simulation';
import { WeeklyOffSetup } from './weekly-off-setup/weekly-off-setup';
import { EmployeeList } from './employee-leave-balance/employee-list/employee-list';
import { LeaveBalance } from './employee-leave-balance/leave-balance/leave-balance';

export const LEAVE_ROUTES: Routes = [
    {
        path: '', component: LeaveManagement,
        children: [
            { path: 'leave-management', component: LeaveTypeConfig },
            { path: 'leave-policy', component: LeavePolicyList },
            { path: 'leave-policy/create', component: CreatePolicy },
            { path: 'leave-policy/edit/:id', component: CreatePolicy },
            // {path: 'leave-type-config', component: LeaveTypeConfig },
            // {path: 'leave-policy-list', component: LeavePolicyList },
            // {path: 'leave-policy-create', component: CreatePolicy },
            // {path: 'leave-policy-edit/:id', component: CreatePolicy },
            { path: 'holiday-calendar', component: HolidayCalendar },
            { path: 'week-off-config', component: WeeklyOffSetup },
            { path: 'leave-simulation', component: LeaveSimulation },
            { path: 'leave-balance', component: EmployeeList },
            { path: 'leave-balance/employee-list/:id', component: LeaveBalance },
            { path: '', redirectTo: 'leave-management', pathMatch: 'full' },

        ]
    },
];