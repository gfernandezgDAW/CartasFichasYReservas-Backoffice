import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

import { UtilsService } from '../../common/services/utils.service';
import { BreadcrumbDataDto } from '../../shared-modules/components/breadcrumb/dtos/breadcrumb-data.dto';
import { BGCategoriesService } from '../bg-categories.service';
import { BGCategory } from '../classes/bg-category.class';

@Component({
  selector: 'app-bg-category-item',
  templateUrl: 'bg-category-item.page.html',
  styleUrls: ['bg-category-item.page.scss'],
})
export class BGCategoryPage implements OnInit {
  id: string;
  bgCategoryForm = this.fromBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });
  breadCrumbDataList: BreadcrumbDataDto[] = [
    { title: 'Categorías', routes: ['bg-categories'] },
  ];

  constructor(
    private route: ActivatedRoute,
    private fromBuilder: FormBuilder,
    private bgCategoriesService: BGCategoriesService,
    protected utilsService: UtilsService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      return;
    }

    this.id = idParam;
    if (this.id !== 'new') {
      this.bgCategoriesService
        .getById(this.id)
        .pipe(first())
        .subscribe((bgCategory: BGCategory) => {
          this.breadCrumbDataList = this.breadCrumbDataList.concat({
            title: `Editar: ${bgCategory.title.trim()}`,
          });
          this.bgCategoryForm.patchValue(bgCategory);
        });
      return;
    }

    this.breadCrumbDataList = this.breadCrumbDataList.concat({
      title: 'Nueva',
    });
    this.bgCategoryForm.patchValue(new BGCategory());
  }

  upsertBgCategory() {
    const bgCategory = this.bgCategoryForm.value as BGCategory;
    if (this.id !== 'new') {
      this.bgCategoriesService
        .updateById(this.id, bgCategory)
        .pipe(first())
        .subscribe(() => {
          this.utilsService.displayToast(
            'La categoría se ha modificado correctamente',
            'success'
          );
          this.utilsService.navigateTo(['bg-categories']);
        });
      return;
    }

    this.bgCategoriesService
      .create(bgCategory)
      .pipe(first())
      .subscribe(() => {
        this.utilsService.displayToast(
          'La categoría se ha generado correctamente',
          'success'
        );
        this.utilsService.navigateTo(['bg-categories']);
      });
  }

  deleteBgCategory() {
    this.bgCategoriesService
      .deleteById(this.id)
      .pipe(first())
      .subscribe(() => {
        this.utilsService.displayToast(
          'El usuario se ha eliminado correctamente',
          'success'
        );
        this.utilsService.navigateTo(['bg-categories'], true);
      });
  }
}
