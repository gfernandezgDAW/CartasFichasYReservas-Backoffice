import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-items',
  templateUrl: 'users-items.page.html',
  styleUrls: ['users-items.page.scss'],
})
export class UsersItemsPage implements OnInit {
  constructor(private usersService: UsersService) {}

  async ngOnInit() {
    this.usersService
      .getAll()
      .pipe(first())
      .subscribe(
        (e) => {
          console.log(e);
        },
        (e) => {
          console.log(e);
        }
      );
  }
}
