import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CSRFInterceptor } from './csrf-interceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: CSRFInterceptor, multi: true }
];
