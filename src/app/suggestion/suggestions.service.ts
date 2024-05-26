import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

import { CrudService } from '../shared-modules/crud/crud.service';
import { Suggestion } from './class/suggestion.class';

export const userCrudUrl = `${environment.apiUrl}suggestion`;
@Injectable()
export class SuggestionService extends CrudService<Suggestion> {
  constructor(http: HttpClient) {
    super(http, userCrudUrl);
  }
}
