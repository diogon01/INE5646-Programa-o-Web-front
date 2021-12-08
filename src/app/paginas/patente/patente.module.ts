import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PatenteRoutingModule} from './patente-routing.module';
import {CadastroComponent} from './cadastro/cadastro.component';
import {PatenteComponent} from './patente.component';
import {CompartilhadoModule} from "../../compartilhado/compartilhado.module";


@NgModule({
  declarations: [
    CadastroComponent,
    PatenteComponent
  ],
  imports: [
    CommonModule,
    PatenteRoutingModule,
    CompartilhadoModule
  ]
})
export class PatenteModule {
}
