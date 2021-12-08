import {IUnidadeFederativa} from "../../../compartilhado/interface/IUnidadeFederativa";
import {IAgenciaEsfera} from "./IAgenciaEsfera";
import {IPais} from "../../../compartilhado/interface/IPais";

export interface IAgencia {
  cd_agencia: number,
  no_agencia: string,
  sgl_agencia: string,
  nu_cnpj: number,
  dsc_email: string,
  nu_telefone: string,
  url_imagem: string,
  st_ativo: boolean,
  agencia_esfera: IAgenciaEsfera,
  uf: IUnidadeFederativa,
  pais: IPais,
  dsc_informacao: string
}
