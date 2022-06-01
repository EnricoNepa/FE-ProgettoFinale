import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  token: string
  tenant: string

  constructor(private authSrv: AuthService) {
    this.token = environment.adminToken
    this.tenant = environment.adminTenant
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let ok: string

    let authReq: HttpRequest<any> = request.clone({headers:request.headers.set('Authorization', 'Bearer ' + this.token).set('X-TENANT-ID', this.tenant)})

    return next.handle(authReq).pipe(
      tap(event =>{
        ok = event instanceof HttpResponse ? 'succeded' : ''
      },
      error => {}
      ),
      catchError((error:HttpErrorResponse)=> {
        return throwError(error)
      }),
      finalize(()=>{})
    )
  }
}
