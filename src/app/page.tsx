'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  trend?: number;
}

function MetricCard({ title, value, description, trend }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        {trend && (
          <span className={`text-xs ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <p className="text-xs text-gray-700">{description}</p>
    </div>
  );
}

export default function Dashboard() {
  const [metrics] = useState({
    totalUsuarios: 1250,
    usuariosAtivos: 980,
    estabelecimentos: 45,
    campanhasAtivas: 12,
    pontosTrocados: 25680,
    notificacoesEnviadas: 156,
  });

  const [chartData] = useState({
    usuariosPorMes: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [
        {
          label: 'Novos Usuários',
          data: [65, 78, 90, 85, 95, 110],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    },
    pontosPorEstabelecimento: {
      labels: ['Padaria São João', 'Mercado Central', 'Farmácia Saúde', 'Restaurante Bom Sabor', 'Loja Moda+'],
      datasets: [
        {
          label: 'Pontos Distribuídos',
          data: [4500, 3800, 3200, 2900, 2500],
          backgroundColor: 'rgba(99, 102, 241, 0.5)',
        },
      ],
    },
  });

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="Total de Usuários"
            value={metrics.totalUsuarios}
            description="Total de usuários cadastrados"
            trend={12}
          />
          <MetricCard
            title="Usuários Ativos"
            value={metrics.usuariosAtivos}
            description={`${Math.round((metrics.usuariosAtivos / metrics.totalUsuarios) * 100)}% do total`}
            trend={8}
          />
          <MetricCard
            title="Estabelecimentos"
            value={metrics.estabelecimentos}
            description="Estabelecimentos parceiros"
            trend={15}
          />
          <MetricCard
            title="Campanhas Ativas"
            value={metrics.campanhasAtivas}
            description="Campanhas em andamento"
          />
          <MetricCard
            title="Pontos Trocados"
            value={metrics.pontosTrocados.toLocaleString()}
            description="Nos últimos 30 dias"
            trend={5}
          />
          <MetricCard
            title="Notificações"
            value={metrics.notificacoesEnviadas}
            description="Enviadas este mês"
            trend={-3}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Crescimento de Usuários</h3>
            </div>
            <Line
              data={chartData.usuariosPorMes}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                },
              }}
            />
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Top 5 Estabelecimentos</h3>
            </div>
            <Bar
              data={chartData.pontosPorEstabelecimento}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
