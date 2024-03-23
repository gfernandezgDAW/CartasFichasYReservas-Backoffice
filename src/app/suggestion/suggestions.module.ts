import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../common/shared.module';

import { SuggestionsItemsPage } from './suggestions-items/suggestions-items.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: SuggestionsItemsPage,
      },
    ]),
  ],
  declarations: [SuggestionsItemsPage],
})
export class SuggestionsModule {}
