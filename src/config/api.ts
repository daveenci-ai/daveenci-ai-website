// Server Configuration for different environments
export const API_CONFIG = {
  development: {
    baseUrl: 'http://localhost:3001'
  },
  production: {
    baseUrl: 'https://daveenci-ai-backend.onrender.com'
  }
};

export const getApiUrl = (endpoint: string): string => {
  const env = process.env.NODE_ENV === 'development' ? 'development' : 'production';
  return `${API_CONFIG[env].baseUrl}${endpoint}`;
}; 