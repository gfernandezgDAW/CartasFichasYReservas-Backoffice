import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { AuthUtilsService } from '../../auth/auth-utils.service';
import { UtilsService } from '../utils.service';

export const AUTH_ERROR_CODES = [401, 403];

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authUtilsService: AuthUtilsService,
    private utilsService: UtilsService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        const token = localStorage.getItem('cfyrAdminToken');
        if (AUTH_ERROR_CODES.includes(err.status) && token) {
          this.utilsService.displayToast(
            'No tienes permiso para realizar esta petición o tu token de sesión a expirado',
            'error'
          );
          this.authUtilsService.logOff(false);
        }

        return throwError(() => err);
      })
    );
  }
}
