import { api } from './api';

const BASE_URL = 'http://localhost:5221';

export interface Notificacao {
  id: number;
  titulo: string;
  mensagem: string;
  dataEnvio: Date;
  usuarioId?: number;
  estabelecimentoId?: number;
}

export const notificacaoService = {
  listar: async () => {
    const response = await api.get(`${BASE_URL}/api/notificacao`);
    return response.data;
  },

  obterPorId: async (id: number) => {
    const response = await api.get(`${BASE_URL}/api/notificacao/${id}`);
    return response.data;
  },

  criar: async (notificacao: Omit<Notificacao, 'id' | 'dataEnvio'>) => {
    const response = await api.post(`${BASE_URL}/api/notificacao`, notificacao);
    return response.data;
  },

  enviar: async (notificacao: Omit<Notificacao, 'id' | 'dataEnvio'>) => {
    const response = await api.post(`${BASE_URL}/api/notificacao/enviar`, notificacao);
    return response.data;
  },
};
