export interface IUsuario {
  token: string,
  nome: string,
  permissoes?: Array<string>
}

export class UsuarioImp implements IUsuario {
  constructor(
    public token: string,
    public nome: string,
    public permissoes?: Array<string>,
  ) {
  }
}
