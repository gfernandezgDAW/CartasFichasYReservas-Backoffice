import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

import { DateUtilsService } from '../../common/services/date-utils.service';
import { UtilsService } from '../../common/services/utils.service';
import { BreadcrumbDataDto } from '../../shared-modules/components/breadcrumb/dtos/breadcrumb-data.dto';
import { Suggestion } from '../class/suggestion.class';
import { SuggestionService } from '../suggestions.service';

@Component({
  selector: 'app-suggestion-items',
  templateUrl: 'suggestion-item.page.html',
  styleUrls: ['suggestion-item.page.scss'],
})
export class SuggestionItemPage implements OnInit {
  id: string;
  suggestionStatusList = ['Creada', 'Aceptada', 'Denegada'];
  suggestion: Suggestion;
  suggestionForm = this.fromBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    status: ['Creada', [Validators.required]],
  });
  breadCrumbDataList: BreadcrumbDataDto[] = [
    { title: 'Sugerencias', routes: ['suggestions'] },
  ];

  constructor(
    private route: ActivatedRoute,
    private fromBuilder: FormBuilder,
    private suggestionService: SuggestionService,
    private dateUtilsService: DateUtilsService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      return;
    }

    this.id = idParam;
    if (this.id !== 'new') {
      this.suggestionService
        .getById(this.id)
        .pipe(first())
        .subscribe((suggestion: Suggestion) => {
          this.suggestion = suggestion;
          this.breadCrumbDataList = this.breadCrumbDataList.concat({
            title: `Editar: Sugerencia de ${
              suggestion.user?.email
            } del ${this.dateUtilsService.toFullDateFormat(
              suggestion.createdAt
            )}`,
          });
          this.suggestionForm.patchValue(suggestion);
        });
    }
  }

  updateSuggestion() {
    const updatedSuggestion = this.suggestionForm.value as Suggestion;

    this.suggestionService
      .updateById(this.id, updatedSuggestion)
      .pipe(first())
      .subscribe(() => {
        this.utilsService.displayToast(
          'La sugerencía se ha modificado correctamente',
          'success'
        );
        this.utilsService.navigateTo(['suggestions']);
      });
  }

  deleteSuggestion() {
    this.suggestionService
      .deleteById(this.id)
      .pipe(first())
      .subscribe(() => {
        this.utilsService.displayToast(
          'La sugerencia se ha eliminado correctamente',
          'success'
        );
        this.utilsService.navigateTo(['suggestions'], true);
      });
  }
}
