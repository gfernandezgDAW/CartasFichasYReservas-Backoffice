import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthUtilsService } from '../auth/auth-utils.service';
import { UtilsService } from '../common/utils.service';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  constructor(
    private utilsService: UtilsService,
    private authUtilsService: AuthUtilsService
  ) {}

  canActivate() {
    const tokenStorage = localStorage.getItem('cfyrAdminToken');
    if (!tokenStorage) {
      this.utilsService.displayToast(
        'Debes iniciar sesión (Token no encontrado)',
        'error'
      );
      this.authUtilsService.logOff(false);
      return false;
    }

    const token: Token = JSON.parse(tokenStorage);
    return !!token;
  }
}
