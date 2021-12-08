import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AgenciaComponent} from './agencia.component';
import {IncluirComponent} from "./cadastro/incluir.component";
import {AutenticadorGuarda} from "../../core/autenticador-guarda";
import {ConsultarComponent} from "./consultar/consultar.component";

const routes: Routes = [
  {
    path: '',
    component: AgenciaComponent,
    canActivate: [AutenticadorGuarda],
    children: [
      {
        path: '',
        redirectTo: 'consultar',
        pathMatch: 'full',
      },
      {
        path: 'cadastrar',
        component: IncluirComponent,
        data: {
          titulo: 'Incluir nova Agência',
        },
      },
      {
        path: 'editar/:id',
        component: IncluirComponent,
        data: {
          titulo: 'Editar Agência',
        },
      },
      {
        path: 'consultar',
        component: ConsultarComponent,
        data: {
          titulo: 'Consultar Agência:',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgenciaRoutingModule {
}
