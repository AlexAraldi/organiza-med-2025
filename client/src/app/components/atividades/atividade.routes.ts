import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { AtividadeService } from './atividade.service';


export const listarAtividadesResolver = () => {
  return inject(AtividadeService).selecionarTodos();
};

export const detalhesAtividadeResolver = (route: ActivatedRouteSnapshot) => {
  const pacienteService = inject(|AtividadeService);

  if (!route.paramMap.get('id')) throw new Error('O parâmetro id não foi fornecido.');

  const pacienteId = route.paramMap.get('id')!;

  return AtividadeService.selecionarPorId(pacienteId);
};

export const pacienteRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListarAtividade,
        resolve: { pacientes: listarAtividadesResolver },
      },
      {
        path: 'cadastrar',
        component: CadastrarAtividade,
      },
      {
        path: 'editar/:id',
        component: EditarAtividade,
        resolve: { paciente: detalhesAtividadeResolver },
      },
      {
        path: 'excluir/:id',
        component: ExcluirAtividade,
        resolve: { paciente: detalhesAtividadeResolver },
      },
    ],
    providers: [AtividadeService],
  },
];
