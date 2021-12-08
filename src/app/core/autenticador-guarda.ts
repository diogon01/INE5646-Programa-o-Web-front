import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AutenticadorServico} from "./servicos/autenticador-servico";

@Injectable({
  providedIn: 'root'
})
export class AutenticadorGuarda implements CanActivate {

  constructor(
    private autenticador: AutenticadorServico,
    private rota: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.autenticador.isAuthenticated) {
      return true
    }
    this.rota.navigate(['login'],
      {queryParams: {returnUrl: state.url}})
      .then(() => {
      });
    return false;
  }
}
