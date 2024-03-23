import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { LayoutComponent } from './shared-modules/ui/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'menu',
    canActivate: [IsAuthenticatedGuard],
    component: LayoutComponent,
    children: [
      {
        path: 'menu',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
        canActivate: [IsAuthenticatedGuard],
      },
      {
        path: 'bg-categories',
        loadChildren: () =>
          import('./bg-category/bg-categories.module').then(
            (m) => m.BGCategoriesModule
          ),
        canActivate: [IsAuthenticatedGuard],
      },
      {
        path: 'board-games',
        loadChildren: () =>
          import('./board-game/board-games.module').then(
            (m) => m.BoardGamesModule
          ),
        canActivate: [IsAuthenticatedGuard],
      },
      {
        path: 'bookings',
        loadChildren: () =>
          import('./booking/booking.module').then((m) => m.BookingsModule),
        canActivate: [IsAuthenticatedGuard],
      },
      {
        path: 'suggestions',
        loadChildren: () =>
          import('./suggestion/suggestions.module').then(
            (m) => m.SuggestionsModule
          ),
        canActivate: [IsAuthenticatedGuard],
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./user/users.module').then((m) => m.UsersModule),
        canActivate: [IsAuthenticatedGuard],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
