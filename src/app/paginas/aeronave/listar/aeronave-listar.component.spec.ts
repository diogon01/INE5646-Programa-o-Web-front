import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeronaveListarComponent } from './aeronave-listar.component';

describe('AeronaveListarComponent', () => {
  let component: AeronaveListarComponent;
  let fixture: ComponentFixture<AeronaveListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeronaveListarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AeronaveListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
