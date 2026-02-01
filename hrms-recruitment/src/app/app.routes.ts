import { Routes } from '@angular/router';
import { RequisitionList } from './features/job-requisition/requisition-list/requisition-list';
// import { Recruitment } from './features/recruitment/recruitment';

export const RECRUITMENT_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'requisition',
        pathMatch: 'full',
    },
    {
        path: 'requisition',
        loadChildren: () =>
            import('./routes/job-requisition.routes')
                .then(m => m.REQUISITION_ROUTES),
    },
    {
        path: 'onboarding',
        loadChildren: () =>
            import('./features/onboarding/onboarding.routes')
                .then(m => m.onboardingRoutes),
    },
    {
        path: '**',
        redirectTo: 'recruitment',
    },
];
