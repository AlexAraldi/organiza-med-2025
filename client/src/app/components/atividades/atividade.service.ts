import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import {
  CadastrarAtividadeModel,
  CadastrarAtividadeResponseModel,
  DetalhesAtividadeModel,
  EditarAtividadeModel,
  EditarAtividadesResponseModel,
  ListarAtividadesApiResponseModel,
  ListarAtividadesModel,
} from './atividade.models';
import { CadastrarAtividadeModel } from '../atividades/atividade.models';

@Injectable()
export class PacienteService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/atividades';

  public cadastrar(
    medicoModel: CadastrarAtividadeModel
  ): Observable<CadastrarAtividadeResponseModel> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((res) => res.dados),
      map((res) => res.registros)
    );
  }

  public editar(
    id: string,
    editarPacienteModel: EditarAtividadeModel
  ): Observable<EditarAtividadesResponseModel> {
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

  public selecionarPorId(id: string): Observable<DetalhesAtividadeModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.get<any>(this.apiUrl).pipe(
      map((res) => res.dados),
      map((res) => res.registros)
    );
  }

  public selecionarTodos(): Observable<ListarAtividadesModel[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((res) => res.dados),
      map((res) => res.registros)
    );
  }
}
