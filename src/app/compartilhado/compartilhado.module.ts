import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MascaraCpfPipe} from './mascara-cpf.pipe';
import {MotorConsultaService} from "./servico/motor-consulta.service";
import {NgxMaskModule} from "ngx-mask";
import {CircularObjectToJsonPipe} from "../core/circular-object-to-json.pipe";
import {MatGridList, MatGridListModule} from "@angular/material/grid-list";
import {MatProgressSpinnerModule, MatSpinner} from "@angular/material/progress-spinner";
import {FormularioAqruivosComponent} from './formulario-aqruivos/formulario-aqruivos.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatCardModule} from "@angular/material/card";
import {NgxMatFileInputModule} from "@angular-material-components/file-input";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialogModule} from "@angular/material/dialog";
import {DialogoAcoesComponent} from '../paginas/agencia/acoes-dialogo/dialogo-acoes.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    MascaraCpfPipe,
    CircularObjectToJsonPipe,
    FormularioAqruivosComponent,
    DialogoAcoesComponent,
  ],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    MatGridListModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatDividerModule,
    MatProgressBarModule,
    RouterModule,
  ],
  providers: [
    MotorConsultaService,
  ],
  exports: [
    CircularObjectToJsonPipe,
    MatGridList,
    MatSpinner,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    DialogoAcoesComponent,
    MatDividerModule,
    MatProgressBarModule,
    RouterModule

  ]
})
export class CompartilhadoModule {
}
