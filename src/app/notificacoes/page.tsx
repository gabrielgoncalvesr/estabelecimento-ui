'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FaPlus } from 'react-icons/fa';

interface Notificacao {
  id: number;
  mensagem: string;
  dataCadastro: Date;
  dataAtualizacao: Date;
}

export default function Notificacoes() {
  const [mensagem, setMensagem] = useState('');
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([
    {
      id: 1,
      mensagem: "Promoção especial de inauguração! Todos os clientes ganham pontos em dobro hoje.",
      dataCadastro: new Date(2024, 0, 15),
      dataAtualizacao: new Date(2024, 0, 15),
    },
    {
      id: 2,
      mensagem: "Atenção estabelecimentos! Nova campanha de fidelidade disponível para adesão.",
      dataCadastro: new Date(2024, 0, 10),
      dataAtualizacao: new Date(2024, 0, 10),
    }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mensagem.trim()) {
      alert('Por favor, digite uma mensagem');
      return;
    }

    try {
      const response = await fetch('http://localhost:5221/api/v1/fidelicard/notificacao/enviar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mensagem,
          dataCadastro: new Date().toISOString(),
          dataAtualizacao: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const novaNotificacao: Notificacao = {
          id: notificacoes.length + 1,
          mensagem,
          dataCadastro: new Date(),
          dataAtualizacao: new Date(),
        };
        
        setNotificacoes([novaNotificacao, ...notificacoes]);
        setMensagem('');
        alert('Notificação enviada com sucesso!');
      } else {
        const error = await response.json();
        alert(error.message || 'Erro ao enviar notificação');
      }
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
      alert('Erro ao enviar notificação');
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-light text-gray-900 mb-4 font-inter">Notificações</h1>
          <p className="text-gray-600 font-inter mb-6">Envie notificações para seus usuários.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">Mensagem</label>
              <Textarea
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Digite sua mensagem aqui..."
                className="min-h-[100px] border-black focus:border-indigo-500 text-black"
                required
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700"
              >
                <FaPlus className="h-4 w-4" /> Enviar Notificação
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Histórico de Notificações</h2>
          <div className="space-y-4">
            {notificacoes.map((notificacao) => (
              <div
                key={notificacao.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
              >
                <p className="text-gray-900 mb-2">{notificacao.mensagem}</p>
                <p className="text-sm text-gray-500">
                  Enviada em {format(notificacao.dataCadastro, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
                    locale: ptBR,
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
