import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { providerAuth } from './components/auth/auth.provider';
import { provideNotifications } from './components/shared/noticacao.provider';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/registrar', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'inicio',
    loadComponent: () => import('./components/inicio/inicio').then((c) => c.Inicio),
  },
  {
    path: 'medico',
    loadChildren: () => import('./components/medicos/medico.routes').then((m) => m.medicoRoutes),
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
