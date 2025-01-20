//import { api } from './api';

export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  documento: string;
  endereco: string;
  cidade: string;
  uf: string;
  senha?: string;
  ativo: boolean;
  dataCadastro?: Date;
  dataAtualizacao?: Date;
}

const mockUsuarios: Usuario[] = [
  {
    id: 1,
    nome: "João da Silva",
    email: "joao.silva@email.com",
    documento: "12345678900",
    endereco: "Rua das Flores, 123",
    cidade: "São Paulo",
    uf: "SP",
    ativo: true,
    dataCadastro: new Date(2024, 0, 1),
    dataAtualizacao: new Date(2024, 0, 1)
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    email: "maria.oliveira@email.com",
    documento: "98765432100",
    endereco: "Avenida Principal, 456",
    cidade: "Rio de Janeiro",
    uf: "RJ",
    ativo: true,
    dataCadastro: new Date(2024, 0, 15),
    dataAtualizacao: new Date(2024, 0, 15)
  }
];

class UsuarioService {
  async listar(): Promise<Usuario[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockUsuarios];
  }

  async obterPorId(id: number): Promise<Usuario | undefined> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUsuarios.find(u => u.id === id);
  }

  async criar(usuario: Omit<Usuario, 'id' | 'dataCadastro' | 'dataAtualizacao'>): Promise<Usuario> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const novoUsuario: Usuario = {
      ...usuario,
      id: Math.max(...mockUsuarios.map(u => u.id ?? 0)) + 1,
      dataCadastro: new Date(),
      dataAtualizacao: new Date()
    };
    
    mockUsuarios.push(novoUsuario);
    return novoUsuario;
  }

  async atualizar(id: number, usuario: Partial<Usuario>): Promise<Usuario> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockUsuarios.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('Usuário não encontrado');
    }

    const usuarioAtualizado = {
      ...mockUsuarios[index],
      ...usuario,
      dataAtualizacao: new Date()
    };

    mockUsuarios[index] = usuarioAtualizado;
    return usuarioAtualizado;
  }

  async excluir(id: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockUsuarios.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('Usuário não encontrado');
    }

    mockUsuarios.splice(index, 1);
  }
}

export const usuarioService = new UsuarioService();
