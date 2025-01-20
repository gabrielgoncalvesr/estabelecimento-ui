'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { UsuarioForm } from '@/components/UsuarioForm';
import { usuarioService } from '@/services/usuarioService';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import type { Usuario } from '@/services/usuarioService';

export default function Usuarios() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadUsuarios = async () => {
    try {
      setIsLoading(true);
      const data = await usuarioService.listar();
      setUsuarios(data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsuarios();
  }, []);

  const handleSuccess = () => {
    loadUsuarios();
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow p-6 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">Usuários</h1>
            <p className="text-gray-600">Gerencie seus usuários aqui.</p>
          </div>
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            Novo Usuário
          </Button>
        </div>

        {isLoading ? (
          <div>Carregando...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {usuarios.map((usuario) => (
              <Card key={usuario.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-purple-600 mb-1 truncate">{usuario.nome}</h3>
                  <p className="text-gray-600 text-sm mb-2">{usuario.email}</p>
                  <p className="text-gray-600 text-sm mb-2">{usuario.documento}</p>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {usuario.endereco}, {usuario.cidade} - {usuario.uf}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span 
                      className={`px-2 py-1 text-xs rounded-full ${
                        usuario.ativo 
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {usuario.ativo ? "Ativo" : "Inativo"}
                    </span>
                    <span className="text-xs text-gray-500">
                      19/01/2025
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <UsuarioForm 
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSuccess={handleSuccess}
        />
      </div>
    </DashboardLayout>
  );
}
