import { inject } from '@angular/core';
import {
    HttpEvent,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const httpInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
) => {
    const router = inject(Router);

    // 🔐 Get token (change key as per your auth)
    const token = localStorage.getItem('access_token');

    // Clone request & attach token
    const authReq = token ? req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    }) : req;

    return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
            let message = 'Something went wrong';

            switch (error.status) {
                case 0:
                    message = 'Server not reachable';
                    break;
                case 400:
                    message = error.error?.message || 'Bad request';
                    break;
                case 401:
                    message = 'Session expired. Please login again';
                    localStorage.clear();
                    router.navigate(['/login']);
                    break;
                case 403:
                    message = 'You are not authorized to perform this action';
                    break;
                case 404:
                    message = 'API not found';
                    break;
                case 500:
                    message = 'Internal server error';
                    break;
            }

            console.error('HTTP Error:', message, error);
            return throwError(() => error);
        })
    );
};
