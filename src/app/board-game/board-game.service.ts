import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { CrudService } from '../shared-modules/crud/crud.service';

import { BoardGame } from './classes/board-game.class';

export const boardGameCrudUrl = `${environment.apiUrl}board-game`;
@Injectable()
export class BoardGameService extends CrudService<BoardGame> {
  constructor(http: HttpClient) {
    super(http, boardGameCrudUrl);
  }
}
