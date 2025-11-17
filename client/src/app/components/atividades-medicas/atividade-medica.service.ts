import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import {
  CadastrarAtividadeMedicaModel,
  CadastrarAtividadeMedicaResponseModel,
  DetalhesAtividadeMedicaModel,
  EditarAtividadeMedicaModel,
  EditarAtividadeMedicaResponseModel,
  ListarAtividadesMedicasModel,
  TipoAtividadeMedicaEnum,
} from './atividade-medica.models';

@Injectable()
export class AtividadeMedicaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/atividades-medicas';

  public cadastrar(
    medicoModel: CadastrarAtividadeMedicaModel
  ): Observable<CadastrarAtividadeMedicaResponseModel> {
    return this.http.post<any>(this.apiUrl, medicoModel).pipe(
      map((res) => res.dados),
      map((res) => res.registros)
    );
  }

  public editar(
    id: string,
    editarAtividadeMedicaModel: EditarAtividadeMedicaModel
  ): Observable<EditarAtividadeMedicaResponseModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.put<any>(urlCompleto, editarAtividadeMedicaModel).pipe(
      map((res) => res.dados),
      map((res) => res.registros)
    );
  }

  public excluir(id: string): Observable<null> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.delete<null>(urlCompleto);
  }

  public selecionarPorId(id: string): Observable<DetalhesAtividadeMedicaModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.get<any>(urlCompleto).pipe(map((res) => res.dados));
  }

  public selecionarTodos(): Observable<ListarAtividadesMedicasModel[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((res) => res.dados),
      map((res) => res.registros)
    );
  }

  public selecionarPorTipoAtividade(
    tipoAtividade: TipoAtividadeMedicaEnum
  ): Observable<ListarAtividadesMedicasModel[]> {
    const urlCompleto = `${this.apiUrl}?tipoAtividade=${tipoAtividade.toLowerCase()}`;

    return this.http.get<any>(this.apiUrl).pipe(map((res) => res.dados));
  }
}
