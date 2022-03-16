import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import {UsuarioServico} from "../../servico/usuario.servico";
import {IUsuario} from "../../interface/IUsuario";

@Component({
  selector: 'usuario-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  _enviandoFormulario: boolean = false;
  _idUsuario: string | null;

  _usuarioFormulario = this.fb.group({
    name: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(private fb: FormBuilder,
              private rotaAtiva: ActivatedRoute,
              private usuarioServico: UsuarioServico) {
    this._idUsuario = this.rotaAtiva.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this._idUsuario) {
      this.carregarUsuario(this._idUsuario);
    }
  }

  onSubmit(): void {
    this._enviandoFormulario = true;
    if (!this._idUsuario){
      this.usuarioServico.inserir(this._usuarioFormulario.getRawValue())
        .subscribe((retorno: IUsuario) => {
          console.log(retorno);
        }, error => {
        }, () => this._enviandoFormulario = false);
    }else {
      this.usuarioServico.atualizar(this._usuarioFormulario.getRawValue(), this._idUsuario)
        .subscribe((retorno: IUsuario) => {
          console.log(retorno);
        }, error => {
        }, () => this._enviandoFormulario = false);
    }

  }

  get titulo(): string {
    return this.rotaAtiva.snapshot.data['titulo'];
  }

  private carregarUsuario(id: string) {
    this.usuarioServico.exibir(id)
      .subscribe(usuario=> {
        this._usuarioFormulario.patchValue(usuario)
      })
  }
}
