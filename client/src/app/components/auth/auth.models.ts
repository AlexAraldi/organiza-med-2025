export interface RegistroModel {
  userName: string;
  email: string;
  password: string;
}

export interface LoginModel {
  userName: string;
  password: string;
}

export interface AccessTokenModel {
  chave: string;
  dataexpiracao: string;
  usuario: UsuarioAutenticadoModel;
}

export interface UsuarioAutenticadoModel {
  id: string;
  userName: string;
  email: string;
}
