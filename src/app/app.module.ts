import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { es } from 'date-fns/locale';
import 'dayjs/locale/es';
import {
  NZ_DATE_LOCALE,
  NZ_I18N,
  NzI18nService,
  es_ES,
} from 'ng-zorro-antd/i18n';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BGCategoriesModule } from './bg-category/bg-categories.module';
import { BoardGamesModule } from './board-game/board-games.module';
import { BookingsModule } from './booking/booking.module';
import { AuthInterceptor } from './common/interceptors/auth.interceptor';
import { GenericNetworkErrorInterceptor } from './common/interceptors/error.interceptor';
import { JwtInterceptor } from './common/interceptors/jwt.interceptor';
import { DateUtilsService } from './common/services/date-utils.service';
import {
  NG_ZORRO_IMPORTED_COMPONENTS,
  UtilsService,
} from './common/services/utils.service';
import { SharedModule } from './common/shared.module';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { HomeModule } from './home/home.module';
import { UiModule } from './shared-modules/ui/ui.module';
import { SuggestionsModule } from './suggestion/suggestions.module';
import { UsersModule } from './user/users.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
    BrowserAnimationsModule,
    ...NG_ZORRO_IMPORTED_COMPONENTS,
    UiModule,
    AuthModule,
    HomeModule,
    UsersModule,
    BoardGamesModule,
    BGCategoriesModule,
    BookingsModule,
    SuggestionsModule,
  ],
  providers: [
    UtilsService,
    DateUtilsService,
    IsAuthenticatedGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GenericNetworkErrorInterceptor,
      multi: true,
    },
    { provide: NZ_I18N, useValue: es_ES },
    { provide: NZ_DATE_LOCALE, useValue: es },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private i18n: NzI18nService) {
    this.i18n.setDateLocale(es);
  }
}
