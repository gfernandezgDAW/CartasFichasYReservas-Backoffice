import { Component } from '@angular/core';

import { AdditionalCrudTableParametersByProperty } from '../../shared-modules/components/crud-table/crud-table.component';

@Component({
  selector: 'app-suggestions-items',
  templateUrl: 'suggestions-items.page.html',
  styleUrls: ['suggestions-items.page.scss'],
})
export class SuggestionsItemsPage {
  additionalCrudTableParametersByPropertySuggestions: AdditionalCrudTableParametersByProperty =
    {
      createdAt: {
        subParameter: undefined,
        dataType: 'date',
        formatTo: 'YYYY-MM-DD HH:mm',
      },
      user: {
        subParameter: 'email',
        dataType: 'any',
        formatTo: undefined,
      },
    };
}
