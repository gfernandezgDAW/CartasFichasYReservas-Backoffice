import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  authUrl = `${environment.apiUrl}auth`;
  constructor(private http: HttpClient) {}

  logIn(email: string, password: string) {
    return this.http.post(`${this.authUrl}/loginAdmin`, {
      email,
      password,
    });
  }
}
