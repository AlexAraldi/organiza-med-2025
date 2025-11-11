import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { CanActivate, CanActivateFn, provideRouter, Router, Routes } from '@angular/router';
import { providerAuth } from './components/auth/auth.provider';
import { provideNotifications } from './components/shared/noticacao.provider';
import { AuthService } from './components/auth/auth.service';
import { map, take } from 'rxjs';

const usuarioDesconhecidoGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.accessToken$.pipe(
    take(1),
    map((token) => (!token ? true : router.createUrlTree(['/inicio'])))
  );
};

const usuarioAutenticadoGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.accessToken$.pipe(
    take(1),
    map((token) => (token ? true : router.createUrlTree(['/auth/login'])))
  );
};

export const routes: Routes = [
  { path: '', redirectTo: 'auth/autenticar', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.routes').then((m) => m.authRoutes),
    canActivate: [usuarioDesconhecidoGuard],
  },
  {
    path: 'inicio',
    loadComponent: () => import('./components/inicio/inicio').then((c) => c.Inicio),
    canActivate: [usuarioAutenticadoGuard],
  },
  {
    path: 'medico',
    loadChildren: () => import('./components/medicos/medico.routes').then((m) => m.medicoRoutes),
    canActivate: [usuarioAutenticadoGuard],
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideNotifications(),
    providerAuth(),
  ],
};
