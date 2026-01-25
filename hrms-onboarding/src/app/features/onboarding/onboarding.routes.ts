import { Routes } from '@angular/router';
export const ONBOARDING_ROUTES: Routes = [
    { path: 'onboarding', loadChildren: () => import('./stages/stages.routes').then(m => m.STAGES_ROUTES), },
    { path: '', redirectTo: 'onboarding', pathMatch: 'full', },
];
