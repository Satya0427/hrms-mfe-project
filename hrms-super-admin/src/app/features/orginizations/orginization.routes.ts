import { Routes } from "@angular/router";
import { OrganizationList } from "./organization-list/organization-list";
import { OrganizationCreate } from "./organization-create/organization-create";
import { OrganizationView } from "./organization-view/organization-view";
import { OrganizationEdit } from "./organization-edit/organization-edit";
import { OrganizationUsage } from "./organization-usage/organization-usage";


export const ORGINIZATION_ROUTES: Routes = [
    { path: 'orginization-list', component: OrganizationList },
    { path: 'orginization-create', component: OrganizationCreate },
    { path: 'orginization-view', component: OrganizationView },
    { path: 'orginization-edit', component: OrganizationEdit },
    { path: 'orginization-usage', component: OrganizationUsage },
    { path: '', redirectTo: 'orginization-list', pathMatch: 'full' },

]