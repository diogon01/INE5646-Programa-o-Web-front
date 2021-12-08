import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./core/login/login.component";
import {LayoutComponent} from "./core/layout/layout.component";
import {DashboardComponent} from "./core/dashboard/dashboard.component";
import {AutenticadorGuarda} from "./core/autenticador-guarda";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'painel-de-controle',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'teste',
      login: 'true',
    },
  },


  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'painel-de-controle',
        component: DashboardComponent,
        canActivate: [AutenticadorGuarda],
        data: {
          title: 'Sistema de Gerenciamento de Escolta e Batedor'
        },
      },
      {
        path: 'agencia',
        loadChildren: () => import('./paginas/agencia/agencia.module').then(m => m.AgenciaModule)
      },
      {
        path: 'patente',
        loadChildren: () => import('./paginas/patente/patente.module').then(m => m.PatenteModule)
      },
    ],

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
