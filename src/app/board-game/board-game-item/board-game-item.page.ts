import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

import { BGCategory } from '../../bg-category/classes/bg-category.class';
import { UtilsService } from '../../common/utils.service';
import { BreadcrumbDataDto } from '../../shared-modules/components/breadcrumb/dtos/breadcrumb-data.dto';
import { UploadedFileResDto } from '../../shared-modules/components/image-uploader/dtos/uploadedFileRes.dto';
import { BoardGameService } from '../board-game.service';
import { BoardGame } from '../classes/board-game.class';

@Component({
  selector: 'app-board-game-item',
  templateUrl: 'board-game-item.page.html',
  styleUrls: ['board-game-item.page.scss'],
})
export class BoardGameItemPage implements OnInit {
  id: string;
  loadedCoverArtImage: string;
  boardGameForm = this.fromBuilder.group({
    title: ['', [Validators.required]],
    introduction: ['', [Validators.required]],
    description: ['', [Validators.required]],
    minPlayers: [1, [Validators.required, Validators.min(1)]],
    maxPlayers: [1, [Validators.required, Validators.min(1)]],
    averageLength: [1, [Validators.required, Validators.min(1)]],
    minAge: [3, [Validators.required, Validators.min(3)]],
    coverArtImage: [''],
    categories: [this.fromBuilder.array([])],
  });
  breadCrumbDataList: BreadcrumbDataDto[] = [
    { title: 'Juegos', routes: ['board-games'] },
  ];

  constructor(
    private route: ActivatedRoute,
    private fromBuilder: FormBuilder,
    private boardGameService: BoardGameService,
    protected utilsService: UtilsService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      return;
    }

    this.id = idParam;
    if (this.id !== 'new') {
      this.boardGameService
        .getById(this.id)
        .pipe(first())
        .subscribe((boardGame: BoardGame) => {
          this.breadCrumbDataList = this.breadCrumbDataList.concat({
            title: `Editar: ${boardGame.title.trim()}`,
          });
          this.boardGameForm.patchValue(boardGame);
          this.checkMinPlayersInputChanges();
          if (boardGame.coverArtImage) {
            this.loadedCoverArtImage = boardGame.coverArtImage;
          }
        });
      return;
    }

    this.breadCrumbDataList = this.breadCrumbDataList.concat({
      title: 'Nuevo',
    });
    this.boardGameForm.patchValue(new BoardGame());
    this.checkMinPlayersInputChanges();
  }

  upsertBoardGame() {
    const boardGame = this.boardGameForm.value as BoardGame;
    if (this.id !== 'new') {
      this.boardGameService
        .updateById(this.id, boardGame)
        .pipe(first())
        .subscribe(() => {
          this.utilsService.displayToast(
            'El juego se ha modificado correctamente',
            'success'
          );
          this.utilsService.navigateTo(['board-games']);
        });
      return;
    }

    this.boardGameService
      .create(boardGame)
      .pipe(first())
      .subscribe(() => {
        this.utilsService.displayToast(
          'El juego se ha generado correctamente',
          'success'
        );
        this.utilsService.navigateTo(['board-games']);
      });
  }

  deleteBoardGame() {
    this.boardGameService
      .deleteById(this.id)
      .pipe(first())
      .subscribe(() => {
        this.utilsService.displayToast(
          'El juego se ha eliminado correctamente',
          'success'
        );
        this.utilsService.navigateTo(['board-games'], true);
      });
  }

  checkMinPlayersInputChanges() {
    const minPlayersValue = this.boardGameForm.controls.minPlayers.value;
    const maxPlayersAbstractControl = this.boardGameForm.get('maxPlayers');

    if (
      maxPlayersAbstractControl &&
      maxPlayersAbstractControl.value !== null &&
      minPlayersValue &&
      maxPlayersAbstractControl.value < minPlayersValue
    ) {
      maxPlayersAbstractControl.patchValue(minPlayersValue);
      maxPlayersAbstractControl.setValidators([
        Validators.required,
        Validators.min(minPlayersValue),
      ]);
    }
  }

  uploadPortadaRes(res: UploadedFileResDto) {
    this.boardGameForm.patchValue({
      coverArtImage: res?.updatedFilename ? res.updatedFilename : null,
    });
  }

  updatedCategoriesList(categories: BGCategory[]) {
    this.boardGameForm.patchValue({ categories });
  }

  getBoardGameFormCategories() {
    if (!this.boardGameForm || !this.boardGameForm.value.categories) {
      return [];
    }

    return this.boardGameForm.value.categories;
  }
}
