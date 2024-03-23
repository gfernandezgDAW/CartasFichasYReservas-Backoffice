import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../common/shared.module';

import { UsersItemsPage } from './users-items/users-items.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersItemsPage,
      },
    ]),
  ],
  declarations: [UsersItemsPage],
})
export class UsersModule {}
