import { Routes } from "@angular/router";
import { Layout } from "../layout/layout";
import { loadRemoteModule } from '@angular-architects/module-federation';


export const layoutRoutes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            { path: '', redirectTo: 'paltform-management', pathMatch: 'full' },
            {
                path: 'recruitment',
                loadChildren: () =>
                    loadRemoteModule({
                        type: 'module',
                        remoteEntry: 'http://localhost:4201/remoteEntry.js',
                        exposedModule: './RECRUITMENT_ROUTES',
                    }).then((m) => m.RECRUITMENT_ROUTES),
            },
            {
                path: 'onboarding-exit',
                loadChildren: () =>
                    loadRemoteModule({
                        type: 'module',
                        remoteEntry: 'http://localhost:4202/remoteEntry.js',
                        exposedModule: './ONBOARDING_EXIT_ROUTES',
                    }).then((m) => m.ONBOARDING_EXIT_ROUTES),
            },
            {
                path: 'paltform-management',
                loadChildren: () =>
                    loadRemoteModule({
                        type: 'module',
                        remoteEntry: 'http://localhost:4204/remoteEntry.js',
                        exposedModule: './PLATFORM_MANAGEMENT_ROUTES',
                    }).then((m) => m.PLATFORM_MANAGEMENT_ROUTES),
            },
        ]
    }
]