import { Routes } from "@angular/router";
import { Layout } from "../layout/layout";
import { loadRemoteModule } from '@angular-architects/module-federation';


export const layoutRoutes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            { path: '', redirectTo: 'hrms-core', pathMatch: 'full' },
            {
                path: 'platform-management',
                loadChildren: () =>
                    loadRemoteModule({
                        type: 'module',
                        remoteEntry: 'http://localhost:4204/remoteEntry.js',
                        exposedModule: './PLATFORM_MANAGEMENT_ROUTES',
                    }).then((m) => m.PLATFORM_MANAGEMENT_ROUTES),
            },
            {
                path: 'hrms-core',
                loadChildren: () =>
                    loadRemoteModule({
                        type: 'module',
                        remoteEntry: 'http://localhost:4206/remoteEntry.js',
                        exposedModule: './HRMS_CORE_ROUTES',
                    }).then((m) => m.HRMS_CORE_ROUTES),
            },
        ]
    }
]