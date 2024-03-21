import {Inject, Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL_TOKEN} from './base-url.token';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
    constructor(@Inject(BASE_URL_TOKEN) private readonly baseUrl: string) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const newRequest = request.clone({
            url: request.url.includes('http') ? request.url : this.baseUrl + request.url,
        });

        return next.handle(newRequest);
    }
}
