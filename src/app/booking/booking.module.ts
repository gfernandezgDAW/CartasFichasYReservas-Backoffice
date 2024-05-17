import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../common/shared.module';

import { BookingItemPage } from './booking-item/booking-item.page';
import { BookingService } from './booking.service';
import { BookingsItemsPage } from './bookings-items/bookings-items.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: BookingsItemsPage,
      },
      {
        path: ':id',
        component: BookingItemPage,
      },
    ]),
  ],
  providers: [BookingService],
  declarations: [BookingsItemsPage, BookingItemPage],
})
export class BookingsModule {}
