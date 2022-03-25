import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {ActivatedRoute} from "@angular/router";
import {AgenciaServico} from "../servico/agencia.servico";
import {IAgencia} from "../interface/IAgencia";
import {AgenciaDataSource} from "../consulta-old/resultado/agencia-data-source";
import {tap} from "rxjs/operators";
import {SelectionModel} from "@angular/cdk/collections";
import {MatDialog} from "@angular/material/dialog";
import {DialogoAcoesComponent} from "../acoes-dialogo/dialogo-acoes.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AcoesEnum} from "../../../compartilhado/enumeracao/AcoesEnum";

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss']
})
export class ConsultarComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginador!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) tabela!: MatTable<IAgencia>;
  _selecao = new SelectionModel<IAgencia>(true, []);
  _agenciaDataSource: AgenciaDataSource;
  agencia!: IAgencia;

  /** Colunas exibidas na tabela. IDs de colunas podem ser adicionados, removidos ou reordenados.. */
  colunas = [
    'no_agencia',
    'sgl_agencia',
    'nu_cnpj',
    'dsc_email',
    'nu_telefone',
    'acoes',
  ];

  constructor(
    private rotaAtiva: ActivatedRoute,
    private agenciaServico: AgenciaServico,
    private dialogo: MatDialog,
    private barraDeAviso: MatSnackBar
  ) {
    this._agenciaDataSource = new AgenciaDataSource(this.agenciaServico);
  }

  ngAfterViewInit(): void {
    this.paginador.page
      .pipe(
        tap(() => this.agenciaCarregar()))
      .subscribe();
  }

  agenciaCarregar() {
    this._agenciaDataSource.agenciasCarregar(
      0,
      '',
      'asc',
      this.paginador.pageIndex,
      this.paginador.pageSize);
  }

  /**
   * @description Verrifica se o número de elementos selecionados corresponde ao número total de linhas.
   * @return true se for verdadeiro
   * */

  todosSelecionados(): boolean {
    const numeroItensSelecionados = this._selecao.selected.length;
    const numeroLinhas = this._agenciaDataSource._agencias.value.length;
    return numeroItensSelecionados === numeroLinhas;

  }


  ngOnInit(): void {
    this._agenciaDataSource.agenciasCarregar(0);
  }

  get acaoExcluir(): number {
    return AcoesEnum.Excluir;
  }

  get acaoVisualizar(): number {
    return AcoesEnum.Visualizar;
  }

  get acaoEditar(): number {
    return AcoesEnum.Editar;
  }

  /**
   * @description Função de chamada do dialogo de exclusão
   * @param agencia, Interface IAgencia
   * @return void, Retorno é inscrito no método:
   */
  dialogoAcoes(agencia: IAgencia, acao: number): void {

    let dialogoAcoes = this.dialogo.open(DialogoAcoesComponent, {
      data: {
        agencia: agencia,
        acao: acao
      },
      disableClose: true,
      panelClass: acao === AcoesEnum.Visualizar ? 'full-width-dialog' : '',
    });

    dialogoAcoes
      .afterClosed()
      .subscribe(
        (excluir: boolean) => {
          if (excluir) {
            this.agenciaServico.excluir(agencia.cd_agencia)
              .subscribe((cd_agencia: number) => {
                this.barraDeAviso.open(
                  `Agência: ${cd_agencia}, excluída com sucesso`,
                  'Desfazer',
                  {
                    duration: 6000,
                    panelClass: ['mat-primary']
                  }).onAction()
                  .subscribe(teste => {
                    this.agenciaServico.inserir(agencia)
                      .subscribe();
                  });
                this.agenciaCarregar();
              }, error => {
                console.log(error);
              });
          }
        });
  }
}
