import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../../../common/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
})
@Injectable()
export class ProfileComponent {
  email = '';
  isVisible = false;
  constructor(private router: Router, private utilsService: UtilsService) {
    const loggedAsStorage = localStorage.getItem('cfyrAdminLoggedAs');
    if (!loggedAsStorage) {
      return;
    }

    this.email = loggedAsStorage;
  }

  logOff() {
    this.isVisible = false;
    localStorage.removeItem('cfyrAdminToken');
    localStorage.removeItem('cfyrAdminLoggedAs');
    this.router.navigate(['']);
    this.utilsService.displayToast('Se cerro la sesión actual', 'info');
  }

  popoverStateChange(isVisible: boolean) {
    this.isVisible = isVisible;
  }
}
