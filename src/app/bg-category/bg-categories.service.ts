import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { CrudService } from '../shared-modules/crud/crud.service';

import { BGCategory } from './classes/bg-category.class';

export const bgCategoryCrudUrl = `${environment.apiUrl}bg-category`;
@Injectable()
export class BGCategoriesService extends CrudService<BGCategory> {
  constructor(http: HttpClient) {
    super(http, bgCategoryCrudUrl);
  }
}
