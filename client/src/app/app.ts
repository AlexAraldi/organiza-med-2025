import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ShellComponent } from './components/shell/shell.component';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './components/auth/auth.service';
import { AsyncPipe } from '@angular/common';
import { PartialObserver } from 'rxjs';
import { NotificacaoService } from './components/shared/notificacao.service';

@Component({
  selector: 'app-root',
  template: `@if (accessToken$ | async; as accessToken) {
    <app-shell [usuario]="accessToken.usuario" (logoutRequisitado)="logout()">
      <router-outlet></router-outlet>
    </app-shell>
    } @else {
    <main class="container-fluid py-3">
      <router-outlet></router-outlet>
    </main>
    } `,
  imports: [MatButtonModule, MatIconModule, ShellComponent, RouterOutlet, AsyncPipe],
})
export class App {
  protected readonly router = inject(Router);
  protected readonly authService = inject(AuthService);
  protected readonly notificacaoService = inject(NotificacaoService);
  protected readonly accessToken$ = this.authService.accessToken$;

  public logout() {
    const logoutObserver: PartialObserver<null> = {
      error: (err) => this.notificacaoService.erro(err.message),
      complete: () => this.router.navigate(['/auth/login']),
    };

    this.authService.sair().subscribe(logoutObserver);
  }
}
