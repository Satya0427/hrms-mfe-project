import { Routes } from '@angular/router';

export const ONBOARDING_EXIT_ROUTES: Routes = [
    { path: '', redirectTo: 'onboarding', pathMatch: 'full', },
    {path: 'onboarding',loadChildren: () => import('./features/onboarding/onboarding.routes').then(m => m.ONBOARDING_ROUTES), },
    {path: '**', redirectTo: 'onboarding',},
];
