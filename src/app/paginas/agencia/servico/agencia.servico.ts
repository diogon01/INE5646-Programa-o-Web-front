import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams, HttpRequest} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable, of} from "rxjs";
import {IAgenciaPagina} from "../interface/IAgenciaPagina";
import {catchError, tap} from "rxjs/operators";
import {environment} from "../../../../environments/environment";
import {FormControl, FormGroup} from "@angular/forms";
import {IAgencia} from "../interface/IAgencia";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class AgenciaServico {

  _url: string = environment.api.url;

  constructor(private http: HttpClient,
              private barraDeAviso: MatSnackBar) {
  }


  listar(
    nrPagina: number,
    tamPagina: number,
    ordenarPor: string): Observable<IAgenciaPagina> {

    return this.http.get<IAgenciaPagina>(`${this._url}/agencia`, {
      params: new HttpParams()
        .set('nrPagina', nrPagina.toString())
        .set('tamPagina', tamPagina.toString())
        .set('ordenarPor', ordenarPor)
    }).pipe(
      catchError(this.handleError<IAgenciaPagina>('Erro login')),
      tap(resposta => {
      })
    );
  }

  buscar(cd_agencia: string): Observable<IAgencia> {
    return this.http.get<IAgencia>(`${this._url}/agencia/${cd_agencia}`)
      .pipe(
        catchError(this.handleError<IAgencia>(
          `Erro ao buscar agencia=${cd_agencia}`
        ))
      )
  }

  buscarAgencia(no_agencia: string): Observable<Array<IAgencia>> {
    return this.http.get<Array<IAgencia>>(`${this._url}/agencia/buscar/${no_agencia}`)
      .pipe(
        catchError(this.handleError<Array<IAgencia>>(
          `Erro ao buscar agencia=${no_agencia}`
        ))
      )
  }

  excluir(cd_agencia: number): Observable<number> {
    return this.http.get<number>(`${this._url}/agencia/excluir/${cd_agencia}`)
      .pipe(
        catchError(this.handleError<number>(
          `Erro ao buscar agencia=${cd_agencia}`
        ))
      )
  }

  inserir(agencia: IAgencia): Observable<IAgencia> {
    return this.http.post<IAgencia>(`${this._url}/agencia`,
      agencia, httpOptions)
      .pipe(
        catchError(this.handleError<IAgencia>(
          `Inserir agencia id=${agencia}`
        ))
      );
  }

  inserirImagem(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('arquivo', file);
    const req = new HttpRequest('POST', `${this._url}/agencia/imagem`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  atualizar(agencia: FormGroup, cd_agencia: string): Observable<IAgencia> {
    return this.http.put<IAgencia>(`${this._url}/agencia/${cd_agencia}`,
      agencia.getRawValue(), httpOptions)
      .pipe(
        catchError(this.handleError<IAgencia>(
          `Atualizar agencia id=${agencia.getRawValue()}`
        ))
      );
  }


  inserirComImagem(agencia: FormGroup, agenciaImagem?: FormControl): Observable<IAgencia> {

    let headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data; boundary="WebKitFormBoundaryibqhf6D6bFCPxUnx"',
      'Accept': 'application/json'
    });
    //let options = new RequestOptions({ headers: headers });

    const formData = new FormData();
    formData.append('agencia', '{"no_agencia":"sm","sgl_agencia":"MP12","nu_cnpj":"00000000000","dsc_email":"diogo.fragoso@sonda.com","nu_telefone":"48999999999","dsc_informacao":"Teste","url_imagem":null,"st_ativo":true,"agencia_esfera":{"cd_esfera_agencia":1,"dsc_esfera_agencia":"FEDERAL"},"uf":{"cd_uf":1,"dsc_uf":"AC"}}');

    if (agenciaImagem)
      formData.append('arquivo', agenciaImagem.value, 'arquivo');
    return this.http.post<IAgencia>(`${this._url}/agencia/inserir-com-anexo`, formData, {headers: headers})
      .pipe(
        catchError(this.handleError<IAgencia>(
          `Inserir agência com imagem=${agencia.getRawValue()}`
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
