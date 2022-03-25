import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AeronaveComponent} from "./aeronave.component";
import {CadastroComponent} from "./cadastro/cadastro.component";
import {AeronaveListarComponent} from "./listar/aeronave-listar.component";

const routes: Routes = [
  {
    path: '',
    component: AeronaveComponent,
    children: [
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
      },
      {
        path: 'cadastrar',
        component: CadastroComponent,
        data: {
          titulo: 'Cadastrar aeronave'
        }
      },
      {
        path: 'editar/:id',
        component: CadastroComponent,
        data: {
          titulo: 'Editar Aeronave'
        }
      },
      {
        path: 'listar',
        component: AeronaveListarComponent,
        data: {
          titulo: 'Listar'
        }
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AeronaveRoutingModule {
}
