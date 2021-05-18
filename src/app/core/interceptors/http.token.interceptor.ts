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
    const headersConfig = {
      'Content-Type': 'application/json'
    };

    const token = this.jwtService.getToken();
    console.log('Token',token)
    if (environment.authorization === 'default') {
      if (token) {
        headersConfig['Authorization'] = `Token ${token}`;
      }
    } else {
      if (token) {
        headersConfig['Authorization'] = `Bearer ${token}`;
      }else{
        headersConfig['Authorization'] = `Basic ${environment.authorization}`;
      }
    }
   
    const request = req.clone({ setHeaders: headersConfig });
    console.log('request',request)
    return next.handle(request);
  }
}
