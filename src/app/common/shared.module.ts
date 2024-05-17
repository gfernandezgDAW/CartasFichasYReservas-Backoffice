import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { BreadcrumbComponent } from '../shared-modules/components/breadcrumb/breadcrumb.component';
import { CrudTableComponent } from '../shared-modules/components/crud-table/crud-table.component';
import { ImageUploaderComponent } from '../shared-modules/components/image-uploader/image-uploader.component';

import {
  ANT_DESING_ICONS,
  NG_ZORRO_IMPORTED_COMPONENTS,
} from './services/utils.service';

@NgModule({
  declarations: [
    CrudTableComponent,
    BreadcrumbComponent,
    ImageUploaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...NG_ZORRO_IMPORTED_COMPONENTS,
    NzIconModule.forChild(ANT_DESING_ICONS),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...NG_ZORRO_IMPORTED_COMPONENTS,
    CrudTableComponent,
    BreadcrumbComponent,
    ImageUploaderComponent,
  ],
})
export class SharedModule {}
