// Server Configuration for different environments
export const API_CONFIG = {
  development: {
    baseUrl: 'http://localhost:3001'
  },
  production: {
    baseUrl: 'https://main-website-server-ituo.onrender.com'
  }
};

export const getApiUrl = (endpoint: string): string => {
  const env = process.env.NODE_ENV === 'development' ? 'development' : 'production';
  return `${API_CONFIG[env].baseUrl}${endpoint}`;
}; 