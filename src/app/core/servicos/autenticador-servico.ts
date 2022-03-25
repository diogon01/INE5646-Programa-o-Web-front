import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, shareReplay, tap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormGroup} from "@angular/forms";
import {UsuarioImp} from "../interface/IUsuario";
import {RespostaLogin} from "../../compartilhado/interface/resposta-login";


const httpPropriedades = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};


@Injectable({
  providedIn: 'root'
})
export class AutenticadorServico {

  jwtHelper = new JwtHelperService();
  url: string = environment.api.url;
  sessao: string = 'jwt_sessao';
  itemTela: string = '';

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {
  }

  iniciarSessao<T>(credencial: FormGroup): Observable<any> {
    return this.http.post<RespostaLogin>(`${this.url}/login`,
      credencial.value, httpPropriedades)
      .pipe(
        catchError(this.handleError<FormGroup>(`Erro login`))
      );
  }

  inserirToken(token: string): void {
    return localStorage.setItem('token', token);
  }

  get atorizacaoToken(): string | null {
    return localStorage.getItem('token');
  }

  removerToken(): void {
    return localStorage.removeItem('token');
  }

  get isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }


  criarSessao(resposta: any): void {
    if (resposta) {
      const token = resposta.body.token;
      const itemTelaStorage = resposta.body.itemTela;
      const payload = this.jwtHelper.decodeToken(token);
      localStorage.setItem(this.sessao, JSON.stringify(new UsuarioImp(token, payload.name)));
      localStorage.setItem(this.itemTela, JSON.stringify(itemTelaStorage));
    }
  }

  get token(): string {
    return localStorage.getItem(this.sessao) ?
      JSON.parse(<string>localStorage.getItem(this.sessao)).token : undefined;
  }

  get autenticado(): boolean {
    return !this.token ? false : !this.jwtHelper.isTokenExpired(this.token);
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
