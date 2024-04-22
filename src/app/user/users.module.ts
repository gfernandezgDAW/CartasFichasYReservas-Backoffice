import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../common/shared.module';

import { UserItemPage } from './user-item/user-item.page';
import { UsersItemsPage } from './users-items/users-items.page';
import { UsersService } from './users.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersItemsPage,
      },
      {
        path: ':id',
        component: UserItemPage,
      },
    ]),
  ],
  providers: [UsersService],
  declarations: [UsersItemsPage, UserItemPage],
})
export class UsersModule {}
