import { Injectable } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  AppstoreOutline,
  HomeOutline,
  NotificationOutline,
  PlayCircleOutline,
  SettingOutline,
  UnorderedListOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {
  NzNotificationModule,
  NzNotificationService,
} from 'ng-zorro-antd/notification';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

export const ANT_DESING_ICONS: IconDefinition[] = [
  HomeOutline,
  SettingOutline,
  UserOutline,
  NotificationOutline,
  UnorderedListOutline,
  PlayCircleOutline,
  AppstoreOutline,
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
];

@Injectable()
export class UtilsService {
  constructor(private nzNotificationService: NzNotificationService) {}

  async displayToast(msg: string, type: 'success' | 'error' | 'info') {
    this.nzNotificationService[type](msg, '');
  }
}
