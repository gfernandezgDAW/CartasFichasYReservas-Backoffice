import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../common/shared.module';

import { BGCategoriesPage } from './bg-categories-items/bg-categories-items.page';
import { BGCategoriesService } from './bg-categories.service';
import { BGCategoryPage } from './bg-category-item/bg-category-item.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: BGCategoriesPage,
      },
      {
        path: ':id',
        component: BGCategoryPage,
      },
    ]),
  ],
  providers: [BGCategoriesService],
  declarations: [BGCategoriesPage, BGCategoryPage],
})
export class BGCategoriesModule {}
