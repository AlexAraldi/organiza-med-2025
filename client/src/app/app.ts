import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ShellComponent } from './components/shell/shell.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './components/auth/auth.service';
import { AsyncPipe } from '@angular/common';

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
  private readonly authService = inject(AuthService);
  protected readonly accessToken$ = this.authService.accessToken$;
  public logout() {
    console.log('logout requisitado');
  }
}
