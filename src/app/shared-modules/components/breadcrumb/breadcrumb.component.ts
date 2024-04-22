import { Component, Injectable, Input } from '@angular/core';

import { UtilsService } from '../../../common/utils.service';
import { BreadcrumbDataDto } from './dtos/breadcrumb-data.dto';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: 'breadcrumb.component.html',
  styleUrls: ['breadcrumb.component.scss'],
})
@Injectable()
export class BreadcrumbComponent {
  @Input() breadCrumbDataList: BreadcrumbDataDto[];

  constructor(private utilsService: UtilsService) {}

  navigateTo(routes: string[]) {
    this.utilsService.navigateTo(routes);
  }
}
