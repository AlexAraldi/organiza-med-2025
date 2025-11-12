import { Component, inject } from '@angular/core';
import { MedicoService } from '../medico.service';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listar-medicos',
  imports: [MatButtonModule, MatIconModule, RouterLink, AsyncPipe, MatCardModule],
  templateUrl: './listar-medicos.html',
})
export class ListarMedicos {
  protected readonly medicoService = inject(MedicoService);
  protected readonly medicos$ = this.medicoService.selecionarTodos();
}
