import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../common/shared.module';

import { AuthService } from './auth.service';
import { LogInPage } from './views/log-in.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: LogInPage },
    ]),
  ],
  providers: [AuthService],
  declarations: [LogInPage],
})
export class AuthModule {}
