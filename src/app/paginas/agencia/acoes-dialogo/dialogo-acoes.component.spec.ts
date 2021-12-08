import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoAcoesComponent } from './dialogo-acoes.component';

describe('AcoesDialogoComponent', () => {
  let component: DialogoAcoesComponent;
  let fixture: ComponentFixture<DialogoAcoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoAcoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoAcoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
