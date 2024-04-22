import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../common/shared.module';

import { BoardGameItemPage } from './board-game-item/board-game-item.page';
import { BoardGameService } from './board-game.service';
import { BoardGamesItemsPage } from './board-games-items/board-games-items.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: BoardGamesItemsPage,
      },
      {
        path: ':id',
        component: BoardGameItemPage,
      },
    ]),
  ],
  providers: [BoardGameService],
  declarations: [BoardGamesItemsPage, BoardGameItemPage],
})
export class BoardGamesModule {}
