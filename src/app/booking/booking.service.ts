import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { BoardGame } from '../board-game/classes/board-game.class';
import { CrudService } from '../shared-modules/crud/crud.service';
import { Booking } from './classes/booking.class';

import { BookableSpace } from './classes/bookable-space.class';

export const boardGameCrudUrl = `${environment.apiUrl}booking`;
@Injectable()
export class BookingService extends CrudService<Booking> {
  constructor(protected override http: HttpClient) {
    super(http, boardGameCrudUrl);
  }

  getAvailableBookingSpaceBetweenDates(
    from: Date,
    to: Date,
    participants: number
  ) {
    return this.http.post<BookableSpace[]>(
      `${boardGameCrudUrl}/available-spaces`,
      { from, to, participants }
    );
  }

  getAvailableBookingSpaceBetweenDatesOnModifyById(
    from: Date,
    to: Date,
    participants: number,
    bookingId: string
  ) {
    return this.http.post<BookableSpace[]>(
      `${boardGameCrudUrl}/available-spaces-modify/${bookingId}`,
      { from, to, participants }
    );
  }

  getAvailableBoardGamesBetweenDates(from: Date, to: Date) {
    return this.http.post<BoardGame[]>(`${boardGameCrudUrl}/available-games`, {
      from,
      to,
    });
  }

  getAvailableGamesBetweenDatesOnModifyById(
    from: Date,
    to: Date,
    bookingId: string
  ) {
    return this.http.post<BoardGame[]>(
      `${boardGameCrudUrl}/available-games-modify/${bookingId}`,
      {
        from,
        to,
        bookingId,
      }
    );
  }
}
