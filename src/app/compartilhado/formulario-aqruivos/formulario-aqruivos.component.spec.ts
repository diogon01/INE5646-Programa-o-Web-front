import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAqruivosComponent } from './formulario-aqruivos.component';

describe('FormularioAqruivosComponent', () => {
  let component: FormularioAqruivosComponent;
  let fixture: ComponentFixture<FormularioAqruivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioAqruivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioAqruivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
