import axios from 'axios';
import { Agent } from 'https';

const API_URLS = {
  campanha: 'http://localhost:5166',
  usuario: 'http://localhost:5094',
  notificacao: 'http://localhost:5221',
  estabelecimento: 'http://localhost:5199',
};

export interface HealthCheckResponse {
  status: string;
  service: string;
}

export interface ServiceStatus {
  name: string;
  isHealthy: boolean;
  error?: string;
}

export const checkServiceHealth = async (serviceName: string, url: string): Promise<ServiceStatus> => {
  try {
    const response = await axios.get<HealthCheckResponse>(`${url}/api/v1/health-check`, {
      httpsAgent: new (Agent)({  
        rejectUnauthorized: false
      })
    });
    return {
      name: serviceName,
      isHealthy: response.data.status === 'healthy',
    };
  } catch (error) {
    if(error === 'Error: socket hang up') {
      return {
        name: serviceName,
        isHealthy: false,
      }
    }

    return {
      name: serviceName,
      isHealthy: false,
      error: 'Serviço indisponível',
    };
  }
};

export const checkAllServices = async (): Promise<ServiceStatus[]> => {
  const checks = Object.entries(API_URLS).map(([name, url]) => 
    checkServiceHealth(name, url)
  );
  
  return Promise.all(checks);
};
