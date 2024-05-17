import { Component } from '@angular/core';
import { AdditionalCrudTableParametersByProperty } from '../../shared-modules/components/crud-table/crud-table.component';

@Component({
  selector: 'app-bookings-items',
  templateUrl: 'bookings-items.page.html',
  styleUrls: ['bookings-items.page.scss'],
})
export class BookingsItemsPage {
  additionalCrudTableParametersByPropertyBookings: AdditionalCrudTableParametersByProperty =
    {
      startOf: {
        subParameter: undefined,
        dataType: 'date',
        formatTo: 'YYYY-MM-DD HH:mm',
      },
      endOf: {
        subParameter: undefined,
        dataType: 'date',
        formatTo: 'HH:mm',
      },
      user: {
        subParameter: 'email',
        dataType: 'any',
        formatTo: undefined,
      },
      boardGame: {
        subParameter: 'title',
        dataType: 'any',
        formatTo: undefined,
      },
      bookableSpace: {
        subParameter: 'spaceNumber',
        dataType: 'any',
        formatTo: undefined,
      },
    };
}
