import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AeronaveComponent} from "./aeronave.component";
import {CadastroComponent} from "./cadastro/cadastro.component";

const routes: Routes = [
  {
    path: '',
    component: AeronaveComponent,
    children: [
      {
        path: '',
        redirectTo: 'cadastrar',
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
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AeronaveRoutingModule { }
