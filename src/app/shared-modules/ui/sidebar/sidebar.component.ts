import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss'],
})
@Injectable()
export class SidebarComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate(['menu', route]);
  }
}
