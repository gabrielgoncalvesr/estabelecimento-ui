'use client'

import { useEffect, useState } from 'react';
import { estabelecimentoService } from '@/services/estabelecimentoService';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { EstabelecimentoForm } from '@/components/EstabelecimentoForm';
import { Estabelecimento } from '@/types';

export default function Estabelecimentos() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadEstabelecimentos = async () => {
    try {
      setIsLoading(true);
      const data = await estabelecimentoService.listar();
      const estabelecimentosFormatados = data.map(est => ({
        ...est,
        id: est.id || 0,
        dataCadastro: est.dataCadastro ? new Date(est.dataCadastro).toISOString() : undefined,
        dataAtualizacao: est.dataAtualizacao ? new Date(est.dataAtualizacao).toISOString() : undefined
      }));
      setEstabelecimentos(estabelecimentosFormatados);
    } catch (error) {
      console.error('Erro ao carregar estabelecimentos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEstabelecimentos();
  }, []);

  const handleSuccess = () => {
    loadEstabelecimentos();
    setIsDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow p-6 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">Estabelecimentos</h1>
            <p className="text-gray-600">Gerencie seus estabelecimentos aqui.</p>
          </div>
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            Novo Estabelecimento
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {estabelecimentos.map((estabelecimento) => (
              <Card key={estabelecimento.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={estabelecimento.imagemUrl || '/placeholder-image.jpg'}
                        alt={estabelecimento.nomeFantasia}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-lg font-semibold text-black">{estabelecimento.nomeFantasia}</h2>
                      <p className="text-gray-600 text-sm">{estabelecimento.razaoSocial}</p>
                      <p className="text-gray-500 text-sm">
                        {estabelecimento.cidade} - {estabelecimento.uf}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`px-2 py-1 rounded text-sm ${estabelecimento.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {estabelecimento.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <EstabelecimentoForm 
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSuccess={handleSuccess}
        />
      </div>
    </DashboardLayout>
  );
}
