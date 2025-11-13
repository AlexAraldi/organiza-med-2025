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
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

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
  {
    path: 'atividades-medicas',
    loadChildren: () =>
      import('./components/atividades-medicas/atividade-medica.routes').then(
        (c) => c.atividadeMedicaRoutes
      ),
    canMatch: [usuarioAutenticadoGuard],
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideNotifications(),
    provideAuth(),
  ],
};
