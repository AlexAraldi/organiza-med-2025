import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/medicos';
  public selecionarTodos(): Observable<Object> {
    return this.http.get(this.apiUrl);
  }
}
