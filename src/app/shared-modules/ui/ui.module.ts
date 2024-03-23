import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../common/shared.module';

import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './profile/profile.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [SharedModule, RouterModule],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    ProfileComponent,
  ],
})
export class UiModule {}
