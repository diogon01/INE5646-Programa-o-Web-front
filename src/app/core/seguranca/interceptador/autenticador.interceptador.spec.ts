import { TestBed } from '@angular/core/testing';

import { AutenticadorInterceptador } from './autenticador.interceptador';

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AutenticadorInterceptador
      ]
  }));

  it('should be created', () => {
    const interceptor: AutenticadorInterceptador = TestBed.inject(AutenticadorInterceptador);
    expect(interceptor).toBeTruthy();
  });
});
