import { TestBed } from '@angular/core/testing';

import { PaisServico } from './pais.servico';

describe('PaisService', () => {
  let service: PaisServico;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaisServico);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
