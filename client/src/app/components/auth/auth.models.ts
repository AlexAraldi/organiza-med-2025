export interface RegistroModel {
  username: string;
  email: string;
  password: string;
}

export interface LoginModel {
  username: string;
  password: string;
}

export interface AccessTokenModel {
  chave: string;
  expiracao: Date;
  usuario: UsuarioAutenticadoModel;
}

export interface UsuarioAutenticadoModel {
  id: string;
  username: string;
  email: string;
}
