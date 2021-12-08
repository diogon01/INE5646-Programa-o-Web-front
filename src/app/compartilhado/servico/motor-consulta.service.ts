import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {IUnidadeFederativa} from "../interface/IUnidadeFederativa";
import {IMunicipio} from "../interface/IMunicipio";

@Injectable({
  providedIn: 'root'
})
export class MotorConsultaService {

  url: string = environment.api.url;

  constructor(private http: HttpClient,
              private _snackBar: MatSnackBar) {
  }


  pesquisarUf<T>(): Observable<Array<IUnidadeFederativa>> {
    return this.http.get<Array<IUnidadeFederativa>>(`${this.url}/motor-consulta/pesquisar-uf`)
      .pipe(
        catchError(this.handleError<Array<IUnidadeFederativa>>('Erro login')),
        tap(resposta => {
        })
      );
  }

  pesquisarMunicipioUF<T>(id: number): Observable<Array<IMunicipio>> {
    return this.http.get<Array<IMunicipio>>(`${this.url}/motor-consulta/pesquisar-uf`)
      .pipe(
        catchError(this.handleError<Array<IMunicipio>>('Erro login')),
        tap(resposta => {
        })
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


  /** Log a AutenticadorService message with the MatSnackBar */
  private log(error: HttpErrorResponse) {
    this._snackBar.open(error.error.error, String(error.status), {
      duration: 6000
    });
  }

}
