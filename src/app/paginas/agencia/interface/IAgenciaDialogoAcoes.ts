import {IDialogoAcoes} from "../../../compartilhado/interface/IDialogoAcoes";
import {IAgencia} from "./IAgencia";

export interface IAgenciaDialogoAcoes extends IDialogoAcoes {
  agencia: IAgencia
}
