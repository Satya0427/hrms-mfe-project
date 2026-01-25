import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    
    { path: 'auth', loadChildren: () => import('../app/features/auth/auth.routes').then(m => m.authRoutes) },
    { path: 'home', canActivate: [authGuard], loadChildren: () => import('./layout/Routers/layout.routes').then(m => m.layoutRoutes) },
    { path: '', redirectTo: 'auth', pathMatch: 'full' },

    { path: '**', redirectTo: 'auth/login' }
];
