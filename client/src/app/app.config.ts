import {
  ApplicationConfig,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { CanActivateFn, provideRouter, Router, Routes } from '@angular/router';
import { provideAuth } from './components/auth/auth.provider';
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
    canMatch: [usuarioDesconhecidoGuard],
  },
  {
    path: 'inicio',
    loadComponent: () => import('./components/inicio/inicio').then((c) => c.Inicio),
    canMatch: [usuarioAutenticadoGuard],
  },
  {
    path: 'medicos',
    loadChildren: () => import('./components/medicos/medico.routes').then((m) => m.medicoRoutes),
    canMatch: [usuarioAutenticadoGuard],
  },
  {
    path: 'pacientes',
    loadChildren: () =>
      import('./components/pacientes/paciente.routes').then((m) => m.pacienteRoutes),
    canMatch: [usuarioAutenticadoGuard],
  },
  // {
  //   path: 'atividades',
  //   loadChildren: () =>
  //     import('./components/atividades/atividade.routes').then((m) => m.atividadeRoutes),
  //   canMatch: [usuarioAutenticadoGuard],
  // },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideNotifications(),
    provideAuth(),
  ],
};
