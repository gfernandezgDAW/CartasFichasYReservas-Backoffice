import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { CrudService } from '../shared-modules/crud/crud.service';

import { User } from './classes/user.class';

export const userCrudUrl = `${environment.apiUrl}user`;
@Injectable()
export class UsersService extends CrudService<User> {
  constructor(http: HttpClient) {
    super(http, userCrudUrl);
  }
}
