import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { AuthService } from './auth.service';

export const providerAuth = (): EnvironmentProviders => {
  return makeEnvironmentProviders([AuthService]);
};
