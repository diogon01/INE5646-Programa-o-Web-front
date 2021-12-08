import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IAgencia} from "../../agencia/interface/IAgencia";
import {AgenciaServico} from "../../agencia/servico/agencia.servico";
import {Location} from "@angular/common";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  _enviandoFormulario: boolean = false;
  _patenteFormulario: FormGroup;
  _agencias: Array<IAgencia>;
  _patenteFormularioImagem: FormControl = new FormControl();

  constructor(
    private rotaAtiva: ActivatedRoute,
    private fb: FormBuilder,
    private agenciaServico: AgenciaServico,
    private _localizacao: Location,
  ) {
    this._patenteFormulario = this.formularioPatente();
    this._agencias = [];
  }

  ngOnInit(): void {
  }

  get titulo(): string {
    return this.rotaAtiva.snapshot.data['titulo'];
  }

  get _agencia(): FormGroup {
    return this._patenteFormulario.controls['agencia'] as FormGroup;
  }

  formularioPatente(): FormGroup {
    return this.fb.group({
      no_patente: [null, [Validators.required]],
      sgl_patente: [null, [Validators.required]],
      agencia: new FormGroup({
        cd_agencia: new FormControl([null, [Validators.required]]),
        no_agencia: new FormControl([null, [Validators.required]])
      })
    })
  }

  carregarAgencias(evento: Event): void {
    let no_agencia = this._agencia.controls['no_agencia'] as FormControl;
    this.agenciaServico.buscarAgencia(no_agencia.value)
      .subscribe((agencias: Array<IAgencia>) => {
        this._agencias = agencias;
      })
  }

  carregarImagem(evento: Event) {
    console.log(evento);
  }

  patenteEnviar() {
  }

  voltar(): void {
    this._localizacao.back();
  }

  selecionarAgencia(agencia: IAgencia) {
  }
}
