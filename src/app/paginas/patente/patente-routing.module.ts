import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AutenticadorGuarda} from "../../core/autenticador-guarda";
import {CadastroComponent} from "./cadastro/cadastro.component";
import {PatenteComponent} from "./patente.component";


const routes: Routes = [{

  path: '',
  component: PatenteComponent,
  canActivate: [AutenticadorGuarda],
  children: [
    {
      path: '',
      redirectTo: 'cadastrar',
      pathMatch: 'full',
    },
    {
      path: 'cadastrar',
      component: CadastroComponent,
      data: {
        titulo: 'Incluir Cargo/Patente',
      },
    },
    {
      path: 'editar/:id',
      component: CadastroComponent,
      data: {
        titulo: 'Incluir nova Agência',
      },
    },
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatenteRoutingModule {
}
