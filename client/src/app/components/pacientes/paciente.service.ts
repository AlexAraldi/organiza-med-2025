import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import {
  CadastrarPacienteModel,
  CadastrarPacienteResponseModel,
  DetalhesPacienteModel,
  EditarPacienteModel,
  EditarPacienteResponseModel,
  ListarPacientesModel,
} from './paciente.models';

@Injectable()
export class PacienteService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/pacientes';

  public cadastrar(
    pacienteModel: CadastrarPacienteModel
  ): Observable<CadastrarPacienteResponseModel> {
    return this.http.post<any>(this.apiUrl, pacienteModel).pipe(
      map((res) => res.dados),
      map((res) => res.registros)
    );
  }

  public editar(
    id: string,
    editarPacienteModel: EditarPacienteModel
  ): Observable<EditarPacienteResponseModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.put<any>(urlCompleto, editarPacienteModel).pipe(
      map((res) => res.dados),
      map((res) => res.registros)
    );
  }

  public excluir(id: string): Observable<null> {
    const urlCompleto = `${this.apiUrl}/${id}`;
    return this.http.delete<null>(urlCompleto);
  }

  public selecionarPorId(id: string): Observable<DetalhesPacienteModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.get<any>(urlCompleto).pipe(map((res) => res.dados));
  }

  public selecionarTodos(): Observable<ListarPacientesModel[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((res) => res.dados),
      map((res) => res.registros)
    );
  }
}
