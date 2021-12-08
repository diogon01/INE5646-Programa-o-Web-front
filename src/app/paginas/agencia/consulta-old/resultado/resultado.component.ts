import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {AgenciaDataSource} from './agencia-data-source';
import {AgenciaServico} from "../../servico/agencia.servico";
import {IAgencia} from "../../interface/IAgencia";
import {tap} from "rxjs/operators";


@Component({
  selector: 'agencia-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginador!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IAgencia>;
  dataSource: AgenciaDataSource;
  agencia!: IAgencia;


  colunas = [
    'no_agencia',
    'sgl_agencia',
    'nu_cnpj',
    'dsc_email',
    'nu_telefone'
  ];

  constructor(
    private agenciaServico: AgenciaServico
  ) {
    this.dataSource = new AgenciaDataSource(this.agenciaServico);
  }


  ngAfterViewInit(): void {
    this.paginador.page
      .pipe(
        tap(() => this.agenciaCarregar())
      )
      .subscribe();
  }

  agenciaCarregar() {
    this.dataSource.agenciasCarregar(
      0,
      '',
      'asc',
      this.paginador.pageIndex,
      this.paginador.pageSize);
  }


  ngOnInit(): void {
    this.dataSource.agenciasCarregar(0);
  }
}
