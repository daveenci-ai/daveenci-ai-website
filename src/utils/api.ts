// Centralized API utilities
import { apiConfig } from '@/config/api';

/**
 * Get the appropriate API base URL for the current environment
 */
export const getApiUrl = (): string => {
  return apiConfig.baseUrl;
};

/**
 * Construct a full API endpoint URL
 */
export const getApiEndpoint = (endpoint: string): string => {
  return `${getApiUrl()}${endpoint}`;
};

/**
 * Common fetch wrapper with error handling
 */
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = getApiEndpoint(endpoint);
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Request failed for ${endpoint}:`, error);
    throw error;
  }
}; 