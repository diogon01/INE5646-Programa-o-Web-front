import { TestBed } from '@angular/core/testing';

import { PatenteServico } from './patente.servico';

describe('PatenteService', () => {
  let service: PatenteServico;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatenteServico);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
