import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgenciaRoutingModule} from './agencia-routing.module';
import {AgenciaComponent} from './agencia.component';
import {FormularioCadastroComponent} from './cadastro/formulario/formulario-cadastro.component';
import {IncluirComponent} from './cadastro/incluir.component';
import {FormularioAgenciaComponent} from './consulta-old/formulario/formulario-agencia.component';
import {ResultadoComponent} from './consulta-old/resultado/resultado.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {CompartilhadoModule} from "../../compartilhado/compartilhado.module";
import {NgxMaskModule} from "ngx-mask";
import {ConsultarComponent} from "./consultar/consultar.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ConsultaOld} from "./consulta-old/consulta-old.component";

@NgModule({
  declarations: [
    AgenciaComponent,
    FormularioCadastroComponent,
    IncluirComponent,
    ConsultarComponent,
    FormularioAgenciaComponent,
    ResultadoComponent,
    ConsultaOld
  ],
  imports: [
    CommonModule,
    AgenciaRoutingModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CompartilhadoModule,
    NgxMaskModule.forRoot(),
  ]
})
export class AgenciaModule {
}
