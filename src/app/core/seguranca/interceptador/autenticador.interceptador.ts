import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AutenticadorServico} from "../../servicos/autenticador-servico";

@Injectable()
export class AutenticadorInterceptador implements HttpInterceptor {

  constructor(private autenticador: AutenticadorServico) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request || !request.url) {
      return next.handle(request);
    }
    const token = this.autenticador.atorizacaoToken
    if (!!token) {
      request = request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }
    return next.handle(request);
  }
}
