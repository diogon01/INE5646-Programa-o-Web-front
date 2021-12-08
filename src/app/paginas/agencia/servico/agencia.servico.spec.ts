import { TestBed } from '@angular/core/testing';

import { AgenciaServico } from './agencia.servico';

describe('AgenciaService', () => {
  let service: AgenciaServico;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgenciaServico);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
