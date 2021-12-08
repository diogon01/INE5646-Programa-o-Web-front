import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {IAgenciaDialogoAcoes} from "../interface/IAgenciaDialogoAcoes";
import {AcoesEnum} from "../../../compartilhado/enumeracao/AcoesEnum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-acoes-dialogo',
  templateUrl: './dialogo-acoes.component.html',
  styleUrls: ['./dialogo-acoes.component.scss']
})
export class DialogoAcoesComponent implements OnInit {

  private acao: AcoesEnum;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: IAgenciaDialogoAcoes,
    private rota: Router) {
    this.acao = data.acao;
  }

  get excluir(): boolean {
    return this.data.acao === AcoesEnum.Excluir;
  }

  get visualizar(): boolean {
    return this.data.acao === AcoesEnum.Visualizar;
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  editar(id: number): void {
    this.rota.navigate(['../agencia/editar', id]).then(r => {
    });
  }
}
