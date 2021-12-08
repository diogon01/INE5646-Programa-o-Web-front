import { TestBed } from '@angular/core/testing';

import { MotorConsultaService } from './motor-consulta.service';

describe('MotorConsultaService', () => {
  let service: MotorConsultaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotorConsultaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
