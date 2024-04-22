export class User {
  username: string;
  email: string;
  dni: string;
  password?: string;
  isAdmin: boolean;

  constructor() {
    this.username = '';
    this.email = '';
    this.dni = '';
    this.password = '';
    this.isAdmin = false;
  }
}
