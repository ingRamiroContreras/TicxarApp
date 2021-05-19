import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JwtService } from '../services';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  headers = `Basic ${environment.authorization}`;
  constructor(private jwtService: JwtService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    const headersConfig = {};

    const token = this.jwtService.getToken();
    console.log('Interceptor');
    if (environment.authorization === 'default') {
      if (token) {
        headersConfig['Content-Type'] = 'application/json';
        headersConfig['Accept'] = 'application/json';
        headersConfig['Authorization'] = `Token ${token}`;
        console.log('default');
      }
    } else {
      if (token) {
        headersConfig['Content-Type'] = 'application/json';
        headersConfig['Accept'] = 'application/json';
        headersConfig['Authorization'] = `Bearer ${token}`;
        console.log('Bearer');
      }else{
        console.log('Basic');
        headersConfig['Content-Type'] = 'application/x-www-form-urlencoded';
        headersConfig['Accept'] = '';
        headersConfig['Authorization'] = `Basic ${environment.authorization}`;
      }
    }
   
    const request = req.clone({ setHeaders: headersConfig });
    console.log('request',request)
    return next.handle(request);
  }
}
