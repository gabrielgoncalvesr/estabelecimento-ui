import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { estabelecimentoService } from '@/services/estabelecimentoService';

interface EstabelecimentoFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EstabelecimentoForm({ isOpen, onClose, onSuccess }: EstabelecimentoFormProps) {
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [documento, setDocumento] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');

  const handleDblClickTitle = () => {
    setNomeFantasia('Restaurante Exemplo');
    setRazaoSocial('Restaurante Exemplo LTDA');
    setDocumento('12.345.678/0001-90');
    setEndereco('Rua das Flores, 123');
    setCidade('São Paulo');
    setUf('SP');
    setImagemUrl('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=500&fit=crop');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await estabelecimentoService.criar({
        nomeFantasia,
        razaoSocial,
        documento,
        endereco,
        cidade,
        uf,
        imagemUrl: imagemUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=500&fit=crop',
        ativo: true
      });
      
      onSuccess();
      onClose();
      setNomeFantasia('');
      setRazaoSocial('');
      setDocumento('');
      setEndereco('');
      setCidade('');
      setUf('');
      setImagemUrl('');
    } catch (error) {
      console.error('Erro ao cadastrar estabelecimento:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-black" onDoubleClick={handleDblClickTitle}>Novo Estabelecimento</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nomeFantasia" className="block text-sm font-medium text-gray-900">
              Nome Fantasia
            </label>
            <Input
              id="nomeFantasia"
              type="text"
              value={nomeFantasia}
              onChange={(e) => setNomeFantasia(e.target.value)}
              required
              className="text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="razaoSocial" className="block text-sm font-medium text-gray-900">
              Razão Social
            </label>
            <Input
              id="razaoSocial"
              type="text"
              value={razaoSocial}
              onChange={(e) => setRazaoSocial(e.target.value)}
              required
              className="text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="documento" className="block text-sm font-medium text-gray-900">
              CNPJ
            </label>
            <Input
              id="documento"
              type="text"
              value={documento}
              onChange={(e) => setDocumento(e.target.value.replace(/\D/g, '').replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5'))}
              required
              maxLength={18}
              placeholder="00.000.000/0000-00"
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
              <option value="">Selecione...</option>
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MT">MT</option>
              <option value="MS">MS</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SP">SP</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
            </select>
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
