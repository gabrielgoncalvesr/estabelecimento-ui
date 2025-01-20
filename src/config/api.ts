export const API_CONFIG = {
  USUARIO: {
    BASE_URL: 'http://localhost:5094',
    ROUTES: {
      LOGIN: 'http://localhost:5094/api/usuario/login',
      LIST: 'http://localhost:5094/api/usuario',
      CREATE: 'http://localhost:5094/api/usuario',
      UPDATE: 'http://localhost:5094/api/usuario',
      DELETE: 'http://localhost:5094/api/usuario',
    }
  },
  ESTABELECIMENTO: {
    BASE_URL: 'http://localhost:5199',
    ROUTES: {
      LIST: 'http://localhost:5199/api/estabelecimento',
      CREATE: 'http://localhost:5199/api/estabelecimento',
      UPDATE: 'http://localhost:5199/api/estabelecimento',
      DELETE: 'http://localhost:5199/api/estabelecimento',
      GET_BY_ID: 'http://localhost:5199/api/estabelecimento',
    }
  },
  CAMPANHA: {
    BASE_URL: 'http://localhost:5166',
    ROUTES: {
      LIST: 'http://localhost:5166/api/campanha',
      CREATE: 'http://localhost:5166/api/campanha',
      UPDATE: 'http://localhost:5166/api/campanha',
      DELETE: 'http://localhost:5166/api/campanha',
      GET_ACTIVE: 'http://localhost:5166/api/campanha/ativas',
    }
  },
  NOTIFICACAO: {
    BASE_URL: 'http://localhost:5221',
    ROUTES: {
      LIST: 'http://localhost:5221/api/notificacao',
      CREATE: 'http://localhost:5221/api/notificacao',
      GET_BY_ID: 'http://localhost:5221/api/notificacao',
      SEND: 'http://localhost:5221/api/notificacao/enviar',
    }
  }
};
