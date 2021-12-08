import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {ValidaCpf} from "../validacao/valida-cpf";
import {AutenticadorServico} from "../servicos/autenticador-servico";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  _ambiente = environment;
  _enviandoFormulario: boolean = false;
  _formularioLogin!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private autenticador: AutenticadorServico,
    private rota: Router,
  ) {
  }

  ngOnInit(): void {
    this._formularioLogin = this.carregarFormulario();
  }

  carregarFormulario(): FormGroup {
    let formulario: FormGroup = this.fb.group({
      chave: [null,
        [Validators.required, Validators.maxLength(11),
          Validators.minLength(11),
          Validators.pattern('[0-9]*$'),
          ValidaCpf()
        ]],
      senha: [null, Validators.required],
      token: [null, [Validators.required, Validators.maxLength(6),
        Validators.pattern('[0-9]*$')]],
      ip: ['1.1.1.1']
    });
    return formulario;
  }


  get chave() {
    return this._formularioLogin.get('chave') as FormControl
  }

  onSubmit(): void {
    this._enviandoFormulario = true;
    this.autenticador.removerToken();
    this.autenticador.iniciarSessao(this._formularioLogin)
      .subscribe(retorno => {
        this.autenticador.inserirToken(retorno.token);
        this.rota.navigateByUrl(`/painel-de-controle`)
          .then(r => {
          });

      }, error => {
        console.log(error);
      }, () => {
        this._enviandoFormulario = false;
      })
  }
}
