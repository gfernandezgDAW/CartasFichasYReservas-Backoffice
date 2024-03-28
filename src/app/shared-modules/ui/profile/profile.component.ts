import { Component, Injectable } from '@angular/core';

import { AuthUtilsService } from '../../../auth/auth-utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
})
@Injectable()
export class ProfileComponent {
  email = '';
  isVisible = false;
  constructor(private authUtilsService: AuthUtilsService) {
    const loggedAsStorage = localStorage.getItem('cfyrAdminLoggedAs');
    if (!loggedAsStorage) {
      return;
    }

    this.email = loggedAsStorage;
  }

  logOff() {
    this.isVisible = false;
    this.authUtilsService.logOff();
  }

  popoverStateChange(isVisible: boolean) {
    this.isVisible = isVisible;
  }
}
