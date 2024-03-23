import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../common/shared.module';

import { BGCategoriesPage } from './bg-categories-items/bg-categories-items.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: BGCategoriesPage,
      },
    ]),
  ],
  declarations: [BGCategoriesPage],
})
export class BGCategoriesModule {}
