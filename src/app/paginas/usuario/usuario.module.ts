import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import {CompartilhadoModule} from "../../compartilhado/compartilhado.module";
import { FormularioComponent } from './cadastro/formulario/formulario.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsuarioComponent,
    CadastroComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    CompartilhadoModule,
    UsuarioRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class UsuarioModule { }
