import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { UtilsService } from '../../common/services/utils.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: 'log-in.page.html',
  styleUrls: ['log-in.page.scss'],
})
export class LogInPage {
  logInForm = this.fromBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fromBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private utilsService: UtilsService
  ) {}

  logInSubmit() {
    const formGroup = this.logInForm.controls;
    const email = formGroup.email.value;
    const password = formGroup.password.value;

    if (!email || !password) {
      return;
    }

    const emailTrimmed = email.trim();
    this.authService
      .logIn(emailTrimmed, password)
      .pipe(first())
      .subscribe(
        (res) => {
          localStorage.setItem('cfyrAdminToken', JSON.stringify(res));
          localStorage.setItem('cfyrAdminLoggedAs', emailTrimmed);
          this.logInForm.reset();
          this.router.navigate(['menu', 'home']);
          this.utilsService.displayToast(
            'Sesión iniciada con exito',
            'success'
          );
        },
        (err) => {
          this.utilsService.displayToast(err.error.message, 'error');
        }
      );
  }
}
