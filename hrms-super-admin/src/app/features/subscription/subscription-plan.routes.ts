import { Routes } from "@angular/router";
import { SubscriptionPlanList } from "./subscription-plan-list/subscription-plan-list";
import { SubscriptionPlanEdit } from "./subscription-plan-edit/subscription-plan-edit";
import { SubscriptionPlanCreate } from "./subscription-plan-create/subscription-plan-create";
import { SubscriptionPlanView } from "./subscription-plan-view/subscription-plan-view";

export const SUBSCRIPTION_PLAN_ROUTES: Routes = [
    { path: 'subscription-plan-list', component: SubscriptionPlanList },
    { path: 'subscription-plan-create', component: SubscriptionPlanCreate },
    { path: 'subscription-plan-edit', component: SubscriptionPlanEdit },
    { path: 'subscription-plan-view', component: SubscriptionPlanView },
    { path: '', redirectTo: 'subscription-plan-list', pathMatch: 'full' },
]