import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {catchError, finalize} from 'rxjs/operators';
import {Observable, BehaviorSubject, of} from 'rxjs';
import {IAgencia} from "../../interface/IAgencia";
import {AgenciaServico} from "../../servico/agencia.servico";
import {IAgenciaPagina} from "../../interface/IAgenciaPagina";


/**
 * Data source for the Resultado view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AgenciaDataSource extends DataSource<IAgencia> {

  _paginador: MatPaginator | undefined;
  _ordenar: MatSort | undefined;
  _agencias: BehaviorSubject<Array<IAgencia>> = new BehaviorSubject<Array<IAgencia>>([]);
  _agenciasCarregando: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public _carregando$ = this._agenciasCarregando.asObservable();

  constructor(
    private agenciaServico: AgenciaServico) {
    super();
  }

  /**
   * Conecta a fonte de dados à tabela.
   * @description A tabela só será atualizada quando
   * o fluxo retornado emitir novos itens..
   * @returns Array<Agencia>
   */
  connect(collectionViewer: CollectionViewer): Observable<Array<IAgencia>> {
    return this._agencias.asObservable();
  }

  /**
   *  Chamado quando a tabela é encerrada.
   *  @description Use esta função para limpar qualquer conexões aberta ou liberar
   *  qualquer recurso retidos durante a conexão.
   */
  disconnect(collectionViewer: CollectionViewer): void {
    this._agencias.complete();
    this._agenciasCarregando.complete();
  }

  agenciasCarregar(courseId: number,
                   filter = '',
                   sortDirection = 'asc',
                   pageNumber = 0,
                   pageSize = 20) {

    this._agenciasCarregando.next(true);
    this.agenciaServico.listar(pageNumber, pageSize, sortDirection)
      .pipe(
        catchError(() => of([])),
        finalize(() => this._agenciasCarregando.next(false))
      )
      .subscribe(
        // @ts-ignore
        (pagina: IAgenciaPagina) => {
          this._agencias.next(pagina.content);
        })
  }

}
