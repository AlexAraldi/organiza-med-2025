import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { AccessTokenModel } from './auth.models';

@Injectable()
export class AuthService {
  public readonly accessTokenSubject$ = new BehaviorSubject<AccessTokenModel | undefined>({
    chave: 'abc123',
    expiracao: new Date('2025-12-31T23:59:59.999Z'),
    usuario: {
      id: '00000000-0000-0000-0000-000000000001',
      username: 'Alex teste',
      email: 'teste@gmail.com',
    },
  });

  public readonly accessToken$ = this.accessTokenSubject$.pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );
}
