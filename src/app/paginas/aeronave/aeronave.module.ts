import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AeronaveRoutingModule } from './aeronave-routing.module';
import {CompartilhadoModule} from "../../compartilhado/compartilhado.module";
import { AeronaveComponent } from './aeronave.component';
import { AeronaveFormComponent } from './cadastro/aeronave-form/aeronave-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { CadastroComponent } from './cadastro/cadastro.component';


@NgModule({
  declarations: [
    AeronaveComponent,
    AeronaveFormComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    CompartilhadoModule,
    AeronaveRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class AeronaveModule { }
