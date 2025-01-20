import { Estabelecimento } from '@/types';

const mockEstabelecimentos: Estabelecimento[] = [
  {
    id: 1,
    nomeFantasia: "Restaurante do João",
    razaoSocial: "João Alimentos LTDA",
    documento: "12.345.678/0001-90",
    endereco: "Rua das Flores, 123",
    cidade: "São Paulo",
    uf: "SP",
    imagemUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=500&fit=crop",
    ativo: true,
    dataCadastro: new Date(2024, 0, 1).toISOString(),
    dataAtualizacao: new Date(2024, 0, 1).toISOString()
  },
  {
    id: 2,
    nomeFantasia: "Café da Maria",
    razaoSocial: "Maria Café LTDA",
    documento: "98.765.432/0001-10",
    endereco: "Avenida Principal, 456",
    cidade: "Rio de Janeiro",
    uf: "RJ",
    imagemUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&h=500&fit=crop",
    ativo: true,
    dataCadastro: new Date(2024, 0, 15).toISOString(),
    dataAtualizacao: new Date(2024, 0, 15).toISOString()
  },
  {
    id: 3,
    nomeFantasia: "Pizzaria Bella",
    razaoSocial: "Bella Pizza LTDA",
    documento: "45.678.901/0001-23",
    endereco: "Rua Itália, 789",
    cidade: "Curitiba",
    uf: "PR",
    imagemUrl: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=500&h=500&fit=crop",
    ativo: true,
    dataCadastro: new Date(2024, 0, 20).toISOString(),
    dataAtualizacao: new Date(2024, 0, 20).toISOString()
  }
];

export const estabelecimentoService = {
  async listar(): Promise<Estabelecimento[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simula delay da rede
    return [...mockEstabelecimentos];
  },

  async criar(estabelecimento: Partial<Estabelecimento>): Promise<Estabelecimento> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const novoEstabelecimento: Estabelecimento = {
      ...estabelecimento,
      id: Math.max(...mockEstabelecimentos.map(e => e.id)) + 1,
      ativo: true,
      dataCadastro: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString()
    } as Estabelecimento;
    
    mockEstabelecimentos.push(novoEstabelecimento);
    return novoEstabelecimento;
  },

  async atualizar(id: number, estabelecimento: Partial<Estabelecimento>): Promise<Estabelecimento> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockEstabelecimentos.findIndex(e => e.id === id);
    if (index === -1) {
      throw new Error('Estabelecimento não encontrado');
    }

    const estabelecimentoAtualizado = {
      ...mockEstabelecimentos[index],
      ...estabelecimento,
      dataAtualizacao: new Date().toISOString()
    };

    mockEstabelecimentos[index] = estabelecimentoAtualizado;
    return estabelecimentoAtualizado;
  },

  async excluir(id: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockEstabelecimentos.findIndex(e => e.id === id);
    if (index === -1) {
      throw new Error('Estabelecimento não encontrado');
    }

    mockEstabelecimentos.splice(index, 1);
  },

  async obterPorId(id: number): Promise<Estabelecimento> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const estabelecimento = mockEstabelecimentos.find(e => e.id === id);
    if (!estabelecimento) {
      throw new Error('Estabelecimento não encontrado');
    }
    return estabelecimento;
  }
};
