import { TestBed } from '@angular/core/testing';

import { AutenticadorGuarda } from './autenticador-guarda';

describe('AutenticadorGuard', () => {
  let guard: AutenticadorGuarda;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutenticadorGuarda);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
