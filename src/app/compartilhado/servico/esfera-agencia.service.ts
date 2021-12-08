import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IAgenciaEsferaGrupo} from "../../paginas/agencia/interface/IAgenciaEsfera";
import {EsferaAgencia} from "../enumeracao/esfera-agencia";

@Injectable({
  providedIn: 'root'
})
export class EsferaAgenciaService {

  constructor(
    private _snackBar: MatSnackBar
  ) {
  }


  carregarEsfera(): Array<IAgenciaEsferaGrupo> {
    let grupo: Array<IAgenciaEsferaGrupo> = [
      {
        nome: "NACIONAL",
        esferas: [
          {
            cd_esfera_agencia: EsferaAgencia.FEDERAL,
            dsc_esfera_agencia: 'FEDERAL'
          },
          {
            cd_esfera_agencia: EsferaAgencia.ESTADUAL,
            dsc_esfera_agencia: 'ESTADUAL'
          },
          {
            cd_esfera_agencia: EsferaAgencia.MUNICIPAL,
            dsc_esfera_agencia: 'MUNICIPAL'
          },
          {
            cd_esfera_agencia: EsferaAgencia.PRIVADO,
            dsc_esfera_agencia: 'PRIVADO'
          },
          {
            cd_esfera_agencia: EsferaAgencia.OUTROS,
            dsc_esfera_agencia: 'OUTROS'
          },
        ],

      },
      {
        nome: "INTERNACIONAL",
        esferas: [
          {
            cd_esfera_agencia: EsferaAgencia.INTERNACIONAL,
            dsc_esfera_agencia: 'INTERNACIONAL',
          },
        ],

      },
    ];

    return grupo;

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
