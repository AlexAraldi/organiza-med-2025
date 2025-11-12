import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterLink } from '@angular/router';
import { UsuarioAutenticadoModel } from '../auth/auth.models';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    AsyncPipe,
    RouterLink,
  ],
})
export class ShellComponent {
  private breakpointObserver = inject(BreakpointObserver);

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  public itensNavBar = [
    { titulo: 'Início', icone: 'home', link: '/inicio' },
    { titulo: 'Médicos', icone: 'medical_information', link: '/medicos' },
    { titulo: 'Pacientes', icone: 'personal_injury', link: '/pacientes' },
    { titulo: 'Atividades', icone: 'pending_actions', link: '/atividades' },
  ];

  @Input({ required: true }) usuario!: UsuarioAutenticadoModel;
  @Output() logoutRequisitado = new EventEmitter<void>();
}
