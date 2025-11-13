export interface ListarPacientesApiResponseModel {
  quantidadeRegistros: number;
  registros: ListarPacientesModel[];
}

export interface ListarPacientesModel {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}

export interface DetalhesPacienteModel {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  atividades: AtividadePacienteModel[];
}

export interface AtividadePacienteModel {
  id: string;
  inicio: Date;
  termino: Date;
  tipoAtividade: TipoAtividadePacienteEnum;
  medicos: MedicoAtividadePacienteModel[];
}

export enum TipoAtividadePacienteEnum {
  Consulta = 'Consulta',
  Cirurgia = 'Cirurgia',
}

export interface MedicoAtividadePacienteModel {
  id: string;
  nome: string;
  crm: string;
}

export interface CadastrarAtividadeModel {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}

export interface CadastrarAtividadeResponseModel {
  id: string;
}

export interface EditarModel {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}

export interface EditarAtividadeResponseModel {
  id: string;
}
