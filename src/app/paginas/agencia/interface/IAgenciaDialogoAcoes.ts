import {IDialogoAcoes} from "../../../compartilhado/interface/IDialogoAcoes";
import {IAeronave} from "../../aeronave/interface/IAeronave";

export interface IAgenciaDialogoAcoes extends IDialogoAcoes {
  aeronave: IAeronave
}
