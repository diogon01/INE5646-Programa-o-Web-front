import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {catchError, finalize} from 'rxjs/operators';
import {Observable, BehaviorSubject, of} from 'rxjs';
import {AeronaveService} from "../servico/aeronave.service";
import {IAeronave} from "../interface/IAeronave";


/**
 * Data source for the Resultado view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AeronaveDataSource extends DataSource<IAeronave> {

  _paginador: MatPaginator | undefined;
  _ordenar: MatSort | undefined;
  _aeronaves: BehaviorSubject<Array<IAeronave>> = new BehaviorSubject<Array<IAeronave>>([]);
  _aeronaveCarregando: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public _carregando$ = this._aeronaveCarregando.asObservable();

  constructor(
    private aeronaveServico: AeronaveService) {
    super();
  }

  /**
   * Conecta a fonte de dados à tabela.
   * @description A tabela só será atualizada quando
   * o fluxo retornado emitir novos itens..
   * @returns Array<Agencia>
   */
  connect(collectionViewer: CollectionViewer): Observable<Array<IAeronave>> {
    return this._aeronaves.asObservable();
  }

  /**
   *  Chamado quando a tabela é encerrada.
   *  @description Use esta função para limpar qualquer conexões aberta ou liberar
   *  qualquer recurso retidos durante a conexão.
   */
  disconnect(collectionViewer: CollectionViewer): void {
    this._aeronaves.complete();
    this._aeronaveCarregando.complete();
  }

  aeronavesCarregar(courseId: number,
                    filter = '',
                    sortDirection = 'asc',
                    pageNumber = 0,
                    pageSize = 20) {

    this._aeronaveCarregando.next(true);
    this.aeronaveServico.listar(pageNumber, pageSize, sortDirection)
      .pipe(
        catchError(() => of([])),
        finalize(() => this._aeronaveCarregando.next(false))
      )
      .subscribe(
        // @ts-ignore
        (aeronaves: Array<IAeronave>) => {
          this._aeronaves.next(aeronaves);
          console.log(aeronaves);
        })
  }

}
