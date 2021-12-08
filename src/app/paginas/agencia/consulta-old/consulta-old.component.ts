import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'agencia-consultar',
  templateUrl: './consulta-old.component.html',
  styleUrls: ['./consulta-old.component.scss']
})
export class ConsultaOld implements OnInit {

  formulario: FormGroup = new FormGroup({});

  constructor(
    private rotaAtiva: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
  }

  get oi(): FormGroup{
    return this.formulario;
  }

  teste(evento: any) {
    console.log(evento)
  }
}
