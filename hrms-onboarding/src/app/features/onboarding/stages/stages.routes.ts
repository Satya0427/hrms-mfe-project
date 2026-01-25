import { Routes } from '@angular/router';
import { OnboardingStageView } from './onboarding-stage-view/onboarding-stage-view';
export const STAGES_ROUTES: Routes = [
    { path: '', redirectTo: 'stages-view', pathMatch: 'full', },
    { path: 'stages-view', component: OnboardingStageView }
];
