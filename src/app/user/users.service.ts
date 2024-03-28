import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable()
export class UsersService {
  authUrl = `${environment.apiUrl}user`;
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.authUrl}/all`);
  }
}
