import { TestBed } from '@angular/core/testing';

import { AutenticadorServico } from './autenticador-servico';

describe('AuthService', () => {
  let service: AutenticadorServico;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticadorServico);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
