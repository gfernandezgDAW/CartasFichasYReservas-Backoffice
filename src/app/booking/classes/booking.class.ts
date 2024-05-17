import dayjs from 'dayjs';

import { BoardGame } from '../../board-game/classes/board-game.class';
import { User } from '../../user/classes/user.class';

import { BookableSpace } from './bookable-space.class';

export class Booking {
  startOf: Date;
  endOf: Date;
  participants: number;
  bookableSpace?: BookableSpace;
  boardGame?: BoardGame;
  user?: User;
  status: 'Pendiente' | 'Activa' | 'Finalizada' | 'Cancelada';
  constructor() {
    this.startOf = dayjs().set('h', 8).set('m', 0).set('s', 0).toDate();
    this.endOf = dayjs().set('h', 8).set('m', 30).set('s', 0).toDate();
    this.participants = 1;
    this.bookableSpace = undefined;
    this.boardGame = undefined;
    this.user = undefined;
    this.status = 'Pendiente';
  }
}
