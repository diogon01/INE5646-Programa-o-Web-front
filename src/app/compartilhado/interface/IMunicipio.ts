import {IGeorreferenciamento} from "./IGeorreferenciamento";
import {IUnidadeFederativa} from "./IUnidadeFederativa";

export interface IMunicipio {
  idMunicipio: number;
  idh: number;
  latitude: IGeorreferenciamento["latitude"];
  longitude: IGeorreferenciamento["longitude"];
  uf: IUnidadeFederativa;
  nome: string;
}
