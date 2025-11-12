import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import {
  CadastrarMedicoModel,
  CadastrarMedicoResponseModel,
  DetalhesMedicoModel,
  EditarMedicoModel,
  EditarMedicoResponseModel,
  ListarMedicosModel,
} from './medico.models';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl + '/medicos';

  public cadastrar(medicoModel: CadastrarMedicoModel): Observable<CadastrarMedicoResponseModel> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((res) => res.dados),
      map((res) => res.registros)
    );
  }

  public editar(
    id: string,
    editarMedicoModel: EditarMedicoModel
  ): Observable<EditarMedicoResponseModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.get<any>(this.apiUrl).pipe(
      map((res) => res.dados),
      map((res) => res.registros)
    );
  }

  public excluir(id: string): Observable<null> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.delete<null>(urlCompleto);
  }

  public selecionarPorId(id: string): Observable<DetalhesMedicoModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.get<any>(this.apiUrl).pipe(
      map((res) => res.dados),
      map((res) => res.registros)
    );
  }

  public selecionarTodos(): Observable<ListarMedicosModel[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((res) => res.dados),
      map((res) => res.registros)
    );
  }
}
