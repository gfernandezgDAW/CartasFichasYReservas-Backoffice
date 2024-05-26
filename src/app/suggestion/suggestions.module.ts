import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../common/shared.module';

import { SuggestionItemPage } from './suggestion-item/suggestion-item.page';
import { SuggestionsItemsPage } from './suggestions-items/suggestions-items.page';
import { SuggestionService } from './suggestions.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: SuggestionsItemsPage,
      },
      {
        path: ':id',
        component: SuggestionItemPage,
      },
    ]),
  ],
  providers: [SuggestionService],
  declarations: [SuggestionsItemsPage, SuggestionItemPage],
})
export class SuggestionsModule {}
