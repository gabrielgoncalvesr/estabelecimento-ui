import { Campanha } from '@/types';

const mockCampanhas: Campanha[] = [
  {
    id: 1,
    nome: "Fidelidade Premium",
    descricao: "Acumule pontos e ganhe prêmios exclusivos",
    tipo: "Pontos",
    regras: "A cada R$ 50 em compras, ganhe 1 ponto",
    premio: "Vale-compras de R$ 100",
    maxParticipantes: 1000,
    quantidadePontos: 10,
    dataInicio: "2024-01-01",
    dataFim: "2024-12-31",
    ativo: 1,
    imagemUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
    dataCadastro: "2024-01-01",
    dataAtualizacao: "2024-01-01",
    estabelecimentoId: 1,
    estabelecimentoNome: "Restaurante do João",
    status: "Ativa",
    pontos: 0
  },
  {
    id: 2,
    nome: "Café Rewards",
    descricao: "Programa de fidelidade para amantes de café",
    tipo: "Pontos",
    regras: "Ganhe 1 ponto a cada café comprado",
    premio: "Café grátis",
    maxParticipantes: 500,
    quantidadePontos: 5,
    dataInicio: "2024-02-01",
    dataFim: "2024-06-30",
    ativo: 1,
    imagemUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    dataCadastro: "2024-01-15",
    dataAtualizacao: "2024-01-15",
    estabelecimentoId: 2,
    estabelecimentoNome: "Café da Maria",
    status: "Ativa",
    pontos: 0
  }
];

export const campanhaService = {
  async listar(): Promise<Campanha[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simula delay da rede
    return [...mockCampanhas];
  },

  async criar(campanha: Partial<Campanha>): Promise<Campanha> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const novaCampanha: Campanha = {
      ...campanha,
      id: Math.max(...mockCampanhas.map(c => c.id)) + 1,
      dataCadastro: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
      pontos: 0
    } as Campanha;
    
    mockCampanhas.push(novaCampanha);
    return novaCampanha;
  },

  async atualizar(id: number, campanha: Partial<Campanha>): Promise<Campanha> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockCampanhas.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Campanha não encontrada');
    }

    const campanhaAtualizada = {
      ...mockCampanhas[index],
      ...campanha,
      dataAtualizacao: new Date().toISOString()
    };

    mockCampanhas[index] = campanhaAtualizada;
    return campanhaAtualizada;
  },

  async excluir(id: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockCampanhas.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Campanha não encontrada');
    }

    mockCampanhas.splice(index, 1);
  },

  async obterPorId(id: number): Promise<Campanha> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const campanha = mockCampanhas.find(c => c.id === id);
    if (!campanha) {
      throw new Error('Campanha não encontrada');
    }
    return campanha;
  },

  async listarPorEstabelecimento(estabelecimentoId: number): Promise<Campanha[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCampanhas.filter(c => c.estabelecimentoId === estabelecimentoId);
  }
};
