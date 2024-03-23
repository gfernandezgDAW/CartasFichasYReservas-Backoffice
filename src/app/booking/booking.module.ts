import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../common/shared.module';

import { BookingItemsPage } from './bookings-items/bookings-items.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: BookingItemsPage,
      },
    ]),
  ],
  declarations: [BookingItemsPage],
})
export class BookingsModule {}
