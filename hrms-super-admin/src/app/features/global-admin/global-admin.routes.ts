import { Routes } from "@angular/router";
import { GlobalAdminList } from "./global-admin-list/global-admin-list";
import { GlobalAdminCreate } from "./global-admin-create/global-admin-create";
import { GlobalAdminView } from "./global-admin-view/global-admin-view";
import { GlobalAdminEdit } from "./global-admin-edit/global-admin-edit";

export const GLOBAL_ADMIN_ROUTES: Routes = [
    { path: 'global-admin-list', component: GlobalAdminList },
    { path: 'global-admin-create', component: GlobalAdminCreate },
    { path: 'global-admin-view', component: GlobalAdminView },
    { path: 'global-admin-edit', component: GlobalAdminEdit },
    { path: '', redirectTo: 'global-admin-list', pathMatch: 'full' },
]