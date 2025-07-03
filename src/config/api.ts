// Server Configuration for different environments
export const API_CONFIG = {
  development: {
    baseUrl: 'http://localhost:3001'
  },
  production: {
    baseUrl: '' // Empty string means use the same domain as the frontend
  }
};

export const getApiUrl = (endpoint: string): string => {
  const env = process.env.NODE_ENV === 'development' ? 'development' : 'production';
  return `${API_CONFIG[env].baseUrl}${endpoint}`;
}; 