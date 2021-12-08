import { TestBed } from '@angular/core/testing';

import { EsferaAgenciaService } from './esfera-agencia.service';

describe('EsferaAgenciaService', () => {
  let service: EsferaAgenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsferaAgenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
