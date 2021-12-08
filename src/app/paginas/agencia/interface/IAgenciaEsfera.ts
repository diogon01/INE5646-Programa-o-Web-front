export interface IAgenciaEsfera {
  cd_esfera_agencia: number;
  dsc_esfera_agencia: string;
}

export interface IAgenciaEsferaGrupo {
  nome: string;
  esferas: Array<IAgenciaEsfera>;
}
