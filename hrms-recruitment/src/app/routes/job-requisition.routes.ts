import { Routes } from '@angular/router';
import { RequisitionList } from '../features/job-requisition/requisition-list/requisition-list';
import { RequisitionCreate } from '../features/job-requisition/requisition-create/requisition-create';
import { RequisitionDetail } from '../features/job-requisition/requisition-detail/requisition-detail';
import { JobRequisitions } from '../features/job-requisition/job-requisitions';

export const REQUISITION_ROUTES: Routes = [
    {
        path: '', component: JobRequisitions,
        children: [
            { path: 'requisition-list', component: RequisitionList },
            { path: 'requisition-create', component: RequisitionCreate },
            { path: 'requisition-details', component: RequisitionDetail },
            { path: '', redirectTo: 'requisition-list', pathMatch: 'full', },
        ]
    }
];
