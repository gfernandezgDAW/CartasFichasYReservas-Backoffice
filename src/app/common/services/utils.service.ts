import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  AppstoreOutline,
  ClearOutline,
  DeleteOutline,
  FilterFill,
  FilterOutline,
  HomeOutline,
  InboxOutline,
  NotificationOutline,
  PlayCircleOutline,
  PlusOutline,
  SettingOutline,
  SyncOutline,
  UnorderedListOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {
  NzNotificationModule,
  NzNotificationService,
} from 'ng-zorro-antd/notification';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzUploadModule } from 'ng-zorro-antd/upload';

export const ANT_DESING_ICONS: IconDefinition[] = [
  HomeOutline,
  SettingOutline,
  UserOutline,
  NotificationOutline,
  UnorderedListOutline,
  PlayCircleOutline,
  AppstoreOutline,
  PlusOutline,
  ClearOutline,
  FilterOutline,
  FilterFill,
  DeleteOutline,
  SyncOutline,
  InboxOutline,
];

export const NG_ZORRO_IMPORTED_COMPONENTS = [
  NzCardModule,
  NzButtonModule,
  NzFormModule,
  NzNotificationModule,
  NzInputModule,
  NzLayoutModule,
  NzIconModule,
  NzMenuModule,
  NzPopoverModule,
  NzTableModule,
  NzDropDownModule,
  NzBreadCrumbModule,
  NzSwitchModule,
  NzInputNumberModule,
  NzUploadModule,
  NzDatePickerModule,
  NzTimePickerModule,
  NzSelectModule,
];

@Injectable()
export class UtilsService {
  constructor(
    private nzNotificationService: NzNotificationService,
    private router: Router
  ) {}

  async displayToast(msg: string, type: 'success' | 'error' | 'info') {
    this.nzNotificationService[type](msg, '');
  }

  crudEntityIsNew(id: string) {
    return id && id === 'new';
  }

  navigateTo(routes: string[], replaceUrl = false) {
    this.router.navigate(['menu'].concat(routes), { replaceUrl });
  }
}
