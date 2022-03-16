import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IUsuario} from "../interface/IUsuario";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioServico {

  _url: string = environment.api.url;

  constructor(private http: HttpClient,
              private barraDeAviso: MatSnackBar) {
  }

  inserir(usuario: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(`${this._url}/usuario`,
      usuario, httpOptions)
      .pipe(
        catchError(this.handleError<IUsuario>(
          `Inserir agencia id=${usuario}`
        ))
      );
  }

  atualizar(usuario: IUsuario, id: string): Observable<IUsuario> {
    return this.http.put<IUsuario>(`${this._url}/usuario/${id}`,
      usuario, httpOptions)
      .pipe(
        catchError(this.handleError<IUsuario>(
          `Inserir agencia id=${usuario}`
        ))
      );
  }

  exibir(id: string): Observable<IUsuario> {
    return this.http.get<IUsuario>(`${this._url}/usuario/${id}`)
      .pipe(
        catchError(this.handleError<IUsuario>(
          `Inserir agencia id=${id}`
        ))
      );
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

