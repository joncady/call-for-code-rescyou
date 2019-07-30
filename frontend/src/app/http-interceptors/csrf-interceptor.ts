import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class CSRFInterceptor implements HttpInterceptor {
    constructor(private cookies: CookieService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const csrfCookie = this.cookies.get('csrftoken');
        if (csrfCookie && req.method === 'POST') {
            req.headers.append('X-CSRFToken', csrfCookie);
        }
        return next.handle(req);
    }
}
