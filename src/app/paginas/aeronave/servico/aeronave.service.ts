import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable, of} from "rxjs";
import {IBateria} from "../interface/IBateria";
import {catchError, map, tap} from "rxjs/operators";
import {environment} from "../../../../environments/environment";
import {IAeronave} from "../interface/IAeronave";
import {IAgenciaPagina} from "../../agencia/interface/IAgenciaPagina";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AeronaveService {

  _url: string = environment.api.url;

  constructor(private http: HttpClient,
              private barraDeAviso: MatSnackBar) {

  }

  salvar(aeronave: IAeronave): Observable<IAeronave> {
    return this.http.post<IAeronave>(`${this._url}/aeronave`,
      aeronave, httpOptions)
      .pipe(
        catchError(this.handleError<IAeronave>(
          `Inserir agencia`
        ))
      );
  }

  editar(aeronave: IAeronave, id: string): Observable<IAeronave> {
    return this.http.put<IAeronave>(`${this._url}/aeronave/${id}`,
      aeronave, httpOptions)
      .pipe(
        catchError(this.handleError<IAeronave>(
          `Inserir agencia`
        ))
      );
  }

  deletar(id: number): Observable<number> {
    return this.http.delete<number>(`${this._url}/aeronave/${id}`)
      .pipe(
        catchError(this.handleError<number>(
          `Remover`
        ))
      );

  }

  listar(
    nrPagina: number,
    tamPagina: number,
    ordenarPor: string): Observable<Array<IAeronave>> {

    // @ts-ignore
    return this.http.get<Array<IAeronave>>(`${this._url}/aeronave`, {
      params: new HttpParams()
        .set('nrPagina', nrPagina.toString())
        .set('tamPagina', tamPagina.toString())
        .set('ordenarPor', ordenarPor)
    }).pipe(
      // @ts-ignore
      map((resultado: Array<IAeronave>)=> resultado['data']),
      catchError(this.handleError<Array<IAeronave>>('Erro login')),
      tap(resposta => {
      })
    );
  }

  carregar(id: string): Observable<IAeronave> {
    return this.http.get<IAeronave>(`${this._url}/aeronave/${id}`)
      .pipe(
        catchError(this.handleError<IAeronave>(
          `Erro ao buscar aeronave=${id}`
        ))
      )
  }


  listarBaterias(): Observable<Array<IBateria>> {
    return this.http.get<Array<IBateria>>(`${this._url}/bateria`)
      .pipe(
        catchError(this.handleError<Array<IBateria>>(
          `Erro ao lisstar baterias`
        ))
      )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: better job of transforming error for usuario consumption
      this.log(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  /** Log a AgenciaServico message with the MatSnackBar */
  private log(error: HttpErrorResponse) {
    this.barraDeAviso.open(error.error.error, String(error.status), {
      duration: 6000
    });
  }

}
