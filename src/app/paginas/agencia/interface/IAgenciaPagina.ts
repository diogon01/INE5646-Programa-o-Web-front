import {IPagina} from "../../../core/interface/IPagina";
import {IAgencia} from "./IAgencia";

export interface IAgenciaPagina extends IPagina {
  content: Array<IAgencia>,
}
