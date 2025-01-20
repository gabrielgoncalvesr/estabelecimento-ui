'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usuarioService } from '@/services/usuarioService';

interface UsuarioFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function UsuarioForm({ isOpen, onClose, onSuccess }: UsuarioFormProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [documento, setDocumento] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');

  const handleDblClickTitle = () => {
    setNome('João da Silva');
    setEmail('joao.silva@email.com');
    setDocumento('12345678900');
    setEndereco('Rua das Flores, 123');
    setCidade('São Paulo');
    setUf('SP');
    setSenha('123456');
    setConfirmacaoSenha('123456');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (senha !== confirmacaoSenha) {
      alert('As senhas não conferem');
      return;
    }
    
    try {
      await usuarioService.criar({
        nome,
        email,
        documento,
        endereco,
        cidade,
        uf,
        senha,
        ativo: true
      });
      
      onSuccess();
      onClose();
      setNome('');
      setEmail('');
      setDocumento('');
      setEndereco('');
      setCidade('');
      setUf('');
      setSenha('');
      setConfirmacaoSenha('');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-gray-900" onDoubleClick={handleDblClickTitle}>Novo Usuário</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-900">
              Nome
            </label>
            <Input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="documento" className="block text-sm font-medium text-gray-900">
              CPF
            </label>
            <Input
              id="documento"
              type="text"
              value={documento}
              onChange={(e) => setDocumento(e.target.value.replace(/\D/g, '').replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4'))}
              required
              maxLength={14}
              placeholder="000.000.000-00"
              className="text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="endereco" className="block text-sm font-medium text-gray-900">
              Endereço
            </label>
            <Input
              id="endereco"
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              required
              className="text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="cidade" className="block text-sm font-medium text-gray-900">
              Cidade
            </label>
            <Input
              id="cidade"
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              required
              className="text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="uf" className="block text-sm font-medium text-gray-900">
              UF
            </label>
            <select
              id="uf"
              value={uf}
              onChange={(e) => setUf(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-gray-900"
              required
            >
              <option value="">Selecione a UF</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
          </div>
          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-900">
              Senha
            </label>
            <Input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="confirmacaoSenha" className="block text-sm font-medium text-gray-900">
              Confirmar Senha
            </label>
            <Input
              id="confirmacaoSenha"
              type="password"
              value={confirmacaoSenha}
              onChange={(e) => setConfirmacaoSenha(e.target.value)}
              required
              className="text-gray-900"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-purple-600 text-purple-600 bg-white"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
