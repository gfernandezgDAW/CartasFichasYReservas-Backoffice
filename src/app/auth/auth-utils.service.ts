import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UtilsService } from '../common/services/utils.service';

@Injectable()
export class AuthUtilsService {
  constructor(private utilsService: UtilsService, private router: Router) {}

  logOff(displayToast = true) {
    localStorage.removeItem('cfyrAdminToken');
    localStorage.removeItem('cfyrAdminLoggedAs');
    this.router.navigate([''], { replaceUrl: true });
    if (!displayToast) {
      return;
    }

    this.utilsService.displayToast('Se cerro la sesión actual', 'info');
  }
}
