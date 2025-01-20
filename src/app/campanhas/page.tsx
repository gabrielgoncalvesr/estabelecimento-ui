'use client'

import { useEffect, useState } from 'react';
import { campanhaService } from '@/services/campanhaService';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CampanhaForm } from '@/components/CampanhaForm';
import { Campanha } from '@/types';

export default function Campanhas() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCampanhas = async () => {
    try {
      setIsLoading(true);
      const data = await campanhaService.listar();
      const campanhasFormatadas = data.map(campanha => ({
        ...campanha,
        estabelecimentoNome: campanha.estabelecimentoNome || 'Não definido',
        pontos: campanha.pontos || 0
      }));
      setCampanhas(campanhasFormatadas);
    } catch (error) {
      console.error('Erro ao carregar campanhas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCampanhas();
  }, []);

  const handleSuccess = () => {
    loadCampanhas();
    setIsDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow p-6 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">Campanhas</h1>
            <p className="text-gray-600">Gerencie suas campanhas aqui.</p>
          </div>
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            Nova Campanha
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {campanhas.map((campanha) => (
              <Card key={campanha.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative w-full h-32 mb-3">
                    <Image
                      src={campanha.imagemUrl || '/placeholder-image.jpg'}
                      alt={campanha.nome}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-black truncate">{campanha.nome}</h2>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{campanha.descricao}</p>
                  <div className="text-sm text-gray-500 mb-1">
                    <p className="truncate">{campanha.estabelecimentoNome}</p>
                    <p className="text-purple-600 font-medium">{campanha.quantidadePontos} pontos</p>
                  </div>
                  <div className="flex justify-end">
                    <span className={`px-2 py-1 rounded text-sm ${campanha.ativo === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {campanha.ativo === 1 ? 'Ativa' : 'Inativa'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <CampanhaForm 
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSuccess={handleSuccess}
        />
      </div>
    </DashboardLayout>
  );
}
