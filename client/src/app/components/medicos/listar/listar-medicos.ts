import { Component, inject } from '@angular/core';
import { MedicoService } from '../medico.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-listar-medicos',
  imports: [AsyncPipe],
  templateUrl: './listar-medicos.html',
})
export class ListarMedicos {
  protected readonly medicoService = inject(MedicoService);
  protected readonly medicos$ = this.medicoService.selecionarTodos();
}
