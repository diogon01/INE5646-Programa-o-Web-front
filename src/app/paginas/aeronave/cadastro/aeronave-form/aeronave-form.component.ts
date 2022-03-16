import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'aeronave-formulario',
  templateUrl: './aeronave-form.component.html',
  styleUrls: ['./aeronave-form.component.scss']
})
export class AeronaveFormComponent {
  _aeronaveFormulario = this.fb.group({
    model: [null, Validators.required],
    weight: [null, Validators.required],
    max_payload: [null, Validators.required],
    motor_model: [null, Validators.required],
    ip_rating: [null, Validators.required],
    max_flight_time: [null, Validators.required]
  });

  hasUnitNumber = false;

  constructor(private fb: FormBuilder,
              private rotaAtiva: ActivatedRoute,) {
  }

  onSubmit(): void {
    alert('Thanks!');
  }

  get titulo(): string {
    return this.rotaAtiva.snapshot.data['titulo'];
  }
}
