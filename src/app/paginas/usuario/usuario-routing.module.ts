import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { UsuarioComponent } from './usuario.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
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
          titulo: 'Cadastrar Usuário',
        },

      },
      {
        path: 'editar/:id',
        component: CadastroComponent,
        data: {
          titulo: 'Editar Usuário',
        },

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
