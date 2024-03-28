import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BGCategoriesModule } from './bg-category/bg-categories.module';
import { BoardGamesModule } from './board-game/board-games.module';
import { BookingsModule } from './booking/booking.module';
import { AuthInterceptor } from './common/interceptors/auth.interceptor';
import { JwtInterceptor } from './common/interceptors/jwt.interceptor';
import { SharedModule } from './common/shared.module';
import {
  NG_ZORRO_IMPORTED_COMPONENTS,
  UtilsService,
} from './common/utils.service';
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
    IsAuthenticatedGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
