import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';
import { AccessTokenModel, LoginModel, RegistroModel } from './auth.models';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { obterOpcoesHeaderAutorizacao } from '../../util/obter-header-autorizacao';

@Injectable()
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/auth';

  public readonly accessTokenSubject$ = new BehaviorSubject<AccessTokenModel | undefined>(
    undefined
  );

  public readonly accessToken$ = this.accessTokenSubject$.pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  public registro(registroModel: RegistroModel): Observable<AccessTokenModel> {
    const urlCompleto = `${this.apiUrl}/registrar`;

    return this.http.post<any>(urlCompleto, registroModel).pipe(
      map((res) => res.dados),
      tap((token) => this.accessTokenSubject$.next(token))
    );
  }

  public login(loginModel: LoginModel): Observable<AccessTokenModel> {
    const urlCompleto = `${this.apiUrl}/autenticar`;
    return this.http.post<any>(urlCompleto, loginModel).pipe(
      map((res) => res.dados),
      tap((token) => this.accessTokenSubject$.next(token))
    );
  }

  public sair(): Observable<null> {
    const urlCompleto = `${this.apiUrl}/sair`;

    return this.http
      .post<null>(
        urlCompleto,
        {},
        obterOpcoesHeaderAutorizacao(this.accessTokenSubject$.getValue())
      )
      .pipe(tap(() => this.accessTokenSubject$.next(undefined)));
  }
}
