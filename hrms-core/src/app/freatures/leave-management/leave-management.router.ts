import { Routes } from '@angular/router';
import { LeaveManagement } from './leave-management';
import { LeaveTypeConfig } from './leave-type-config/leave-type-config';
import { LeavePolicyList } from './leave-policy-list/leave-policy-list';
import { CreatePolicy } from './leave-policy-list/create-policy/create-policy';

export const LEAVE_ROUTES: Routes = [
    {
        path: '', component: LeaveManagement,
        children: [
            { path: 'leave-management', component: LeaveTypeConfig },
            { path: 'leave-policy', component: LeavePolicyList },
            { path: 'leave-policy/create', component: CreatePolicy },
            { path: 'leave-policy/edit/:id', component: CreatePolicy },
            { path: '', redirectTo: 'leave-management', pathMatch: 'full' },

        ]
    },
];