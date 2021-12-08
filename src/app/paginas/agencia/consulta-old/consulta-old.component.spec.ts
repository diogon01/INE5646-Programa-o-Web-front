import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaOld } from './consulta-old.component';

describe('ConsultarComponent', () => {
  let component: ConsultaOld;
  let fixture: ComponentFixture<ConsultaOld>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaOld ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaOld);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
