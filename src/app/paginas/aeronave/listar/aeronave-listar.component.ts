import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable} from "@angular/material/table";
import {IAgencia} from "../../agencia/interface/IAgencia";
import {AeronaveDataSource} from "./aeronave-data-source";
import {AeronaveService} from "../servico/aeronave.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {tap} from "rxjs/operators";
import {IAeronave} from "../interface/IAeronave";
import {MatDialog} from "@angular/material/dialog";
import {DialogoAcoesComponent} from "../../agencia/acoes-dialogo/dialogo-acoes.component";
import {AcoesEnum} from "../../../compartilhado/enumeracao/AcoesEnum";

@Component({
  selector: 'app-aeronave-listar',
  templateUrl: './aeronave-listar.component.html',
  styleUrls: ['./aeronave-listar.component.scss']
})
export class AeronaveListarComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginador!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) tabela!: MatTable<IAgencia>;

  _aeronaveDataSource: AeronaveDataSource;
  _aeronave!: IAeronave;

  /** Colunas exibidas na tabela. IDs de colunas podem ser adicionados, removidos ou reordenados.. */
  colunas = [
    'id',
    'model',
    'max_payload',
    'ip_rating',
    'max_flight_time',
    'acoes',
  ];

  constructor(
    private rotaAtiva: ActivatedRoute,
    private aeronaveServico: AeronaveService,
    private barraDeAviso: MatSnackBar,
    private dialogo: MatDialog,
    private rota: Router) {
    this._aeronaveDataSource = new AeronaveDataSource(this.aeronaveServico);
  }

  ngOnInit(): void {
    this._aeronaveDataSource.aeronavesCarregar(1);
  }

  get acaoExcluir(): number {
    return AcoesEnum.Excluir;
  }

  ngAfterViewInit(): void {
    this.paginador.page
      .pipe(
        tap(() => this.aeronaveCarregar()))
  }

  private aeronaveCarregar() {
    this._aeronaveDataSource.aeronavesCarregar(
      1,
      '',
      'asc',
      this.paginador.pageIndex,
      this.paginador.pageSize);
  }

  editar(aeronave: IAeronave) {
    this.rota.navigate([`aeronave/editar/${aeronave.id}`])
      .then(() => {
      });
    return false;
  }


  /**
   * @description Função de chamada do dialogo de exclusão
   * @param aeronave, Interface IAgencia
   * @return void, Retorno é inscrito no método:
   */
  dialogoAcoes(aeronave: IAeronave, acao: number): void {

    let dialogoAcoes = this.dialogo.open(DialogoAcoesComponent, {
      data: {
        aeronave: aeronave,
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
            this.aeronaveServico.deletar(aeronave.id)
              .subscribe((id: number) => {
                this.barraDeAviso.open(
                  `Agência: ${id}, excluída com sucesso`,
                  'Desfazer',
                  {
                    duration: 6000,
                    panelClass: ['mat-primary']
                  }).onAction()
                  .subscribe(teste => {
                    this.aeronaveServico.salvar(aeronave)
                      .subscribe();
                  });
                this.aeronaveCarregar();
              }, error => {
                console.log(error);
              });
          }
        });
  }
}
