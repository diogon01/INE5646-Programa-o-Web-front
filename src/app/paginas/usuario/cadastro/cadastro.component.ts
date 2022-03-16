import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  _enviandoFormulario: boolean;

  constructor(
    private rotaAtiva: ActivatedRoute,
  ) {
    this._enviandoFormulario = false;
  }

  ngOnInit(): void {
  }

  get titulo(): string {
    return this.rotaAtiva.snapshot.data['titulo'];
  }

}
