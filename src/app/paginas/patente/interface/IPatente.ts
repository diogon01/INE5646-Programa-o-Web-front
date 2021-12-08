import {IAgencia} from "../../agencia/interface/IAgencia";

export interface IPatente {
  cd_patente: number,
  no_patente: string,
  sgl_patente: string,
  agencia: IAgencia

}
