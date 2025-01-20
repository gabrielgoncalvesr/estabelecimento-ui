export interface Estabelecimento {
  id: number;
  nomeFantasia: string;
  razaoSocial: string;
  documento: string;
  endereco: string;
  cidade: string;
  uf: string;
  imagemUrl: string;
  ativo: boolean;
  dataCadastro?: string;
  dataAtualizacao?: string;
}

export interface Campanha {
  id: number;
  nome: string;
  descricao: string;
  tipo: string;
  regras: string;
  premio: string;
  maxParticipantes: number;
  quantidadePontos: number;
  dataInicio: string;
  dataFim: string;
  ativo: number; // 0 ou 1
  imagemUrl: string;
  dataCadastro?: string | null;
  dataAtualizacao?: string | null;
  estabelecimentoId: number;
  estabelecimentoNome: string;
  status?: 'Ativa' | 'Inativa' | 'Encerrada';
  pontos?: number;
}
