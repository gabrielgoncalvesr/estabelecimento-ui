'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { campanhaService } from '@/services/campanhaService';

interface CampanhaFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CampanhaForm({ isOpen, onClose, onSuccess }: CampanhaFormProps) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState('');
  const [regras, setRegras] = useState('');
  const [premio, setPremio] = useState('');
  const [maxParticipantes, setMaxParticipantes] = useState('');
  const [quantidadePontos, setQuantidadePontos] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [estabelecimentoId] = useState('1'); // Temporário

  const handleDblClickTitle = () => {
    setNome('Campanha Exemplo');
    setDescricao('Descrição da campanha exemplo');
    setTipo('Pontos');
    setRegras('Regras da campanha exemplo');
    setPremio('Prêmio exemplo');
    setMaxParticipantes('100');
    setQuantidadePontos('10');
    setDataInicio('2024-01-01');
    setDataFim('2024-12-31');
    setImagemUrl('https://images.unsplash.com/photo-1472851294608-062f824d29cc');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await campanhaService.criar({
        nome,
        descricao,
        tipo,
        regras,
        premio,
        maxParticipantes: Number(maxParticipantes),
        quantidadePontos: Number(quantidadePontos),
        dataInicio,
        dataFim,
        imagemUrl: imagemUrl || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc',
        estabelecimentoId: Number(estabelecimentoId),
        ativo: 1
      });
      
      onSuccess();
      onClose();
      setNome('');
      setDescricao('');
      setTipo('');
      setRegras('');
      setPremio('');
      setMaxParticipantes('');
      setQuantidadePontos('');
      setDataInicio('');
      setDataFim('');
      setImagemUrl('');
    } catch (error) {
      console.error('Erro ao cadastrar campanha:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-gray-900" onDoubleClick={handleDblClickTitle}>Nova Campanha</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-900">
              Nome da Campanha
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
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-900">
              Descrição
            </label>
            <Input
              id="descricao"
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
              className="text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-900">
              Tipo
            </label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-gray-900"
              required
            >
              <option value="">Selecione...</option>
              <option value="Pontos">Pontos</option>
              <option value="Cashback">Cashback</option>
              <option value="Desconto">Desconto</option>
            </select>
          </div>
          <div>
            <label htmlFor="regras" className="block text-sm font-medium text-gray-900">
              Regras
            </label>
            <Input
              id="regras"
              type="text"
              value={regras}
              onChange={(e) => setRegras(e.target.value)}
              required
              className="text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="premio" className="block text-sm font-medium text-gray-900">
              Prêmio
            </label>
            <Input
              id="premio"
              type="text"
              value={premio}
              onChange={(e) => setPremio(e.target.value)}
              required
              className="text-gray-900"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="maxParticipantes" className="block text-sm font-medium text-gray-900">
                Máximo de Participantes
              </label>
              <Input
                id="maxParticipantes"
                type="number"
                value={maxParticipantes}
                onChange={(e) => setMaxParticipantes(e.target.value)}
                required
                min="1"
                className="text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="quantidadePontos" className="block text-sm font-medium text-gray-900">
                Quantidade de Pontos
              </label>
              <Input
                id="quantidadePontos"
                type="number"
                value={quantidadePontos}
                onChange={(e) => setQuantidadePontos(e.target.value)}
                required
                min="1"
                className="text-gray-900"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="dataInicio" className="block text-sm font-medium text-gray-900">
                Data de Início
              </label>
              <Input
                id="dataInicio"
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                required
                className="text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="dataFim" className="block text-sm font-medium text-gray-900">
                Data de Término
              </label>
              <Input
                id="dataFim"
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                required
                className="text-gray-900"
              />
            </div>
          </div>
          <div>
            <label htmlFor="imagemUrl" className="block text-sm font-medium text-gray-900">
              URL da Imagem
            </label>
            <Input
              id="imagemUrl"
              type="url"
              value={imagemUrl}
              onChange={(e) => setImagemUrl(e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
              className="text-gray-900"
            />
            <p className="mt-1 text-sm text-gray-500">
              Se não informada, será usada uma imagem padrão
            </p>
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
