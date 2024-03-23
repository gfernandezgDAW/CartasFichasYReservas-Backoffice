import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  ANT_DESING_ICONS,
  NG_ZORRO_IMPORTED_COMPONENTS,
} from './utils.service';

@NgModule({
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
  ],
})
export class SharedModule {}
