import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../common/shared.module';

import { BoardGamesItemsPage } from './board-games-items/board-games-items.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: BoardGamesItemsPage,
      },
    ]),
  ],
  declarations: [BoardGamesItemsPage],
})
export class BoardGamesModule {}
