'use client';

import { useEffect, useState } from 'react';
import { ServiceStatus, checkAllServices } from '@/services/healthCheckService';

export default function MonitoringPage() {
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [loading, setLoading] = useState(true);

  const checkServices = async () => {
    try {
      const results = await checkAllServices();
      setServices(results);
    } catch (error) {
      console.error('Erro ao verificar serviços:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkServices();
    const interval = setInterval(checkServices, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Status dos Serviços</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div key={service.name} className="bg-gray-50 rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold capitalize text-gray-900">{service.name}</h2>
                <span 
                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                    service.isHealthy 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {service.isHealthy ? 'Online' : 'Offline'}
                </span>
              </div>
              {!service.isHealthy && service.error && (
                <p className="text-sm text-red-500 mt-2">{service.error}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
