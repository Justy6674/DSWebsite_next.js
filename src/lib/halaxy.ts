/**
 * Halaxy API Integration
 * Practice management system integration for appointments and patient data
 */

interface HalaxyConfig {
  baseUrl: string;
  apiKey: string;
}

const getHalaxyConfig = (): HalaxyConfig => {
  const baseUrl = process.env.HALAXY_BASE_URL || process.env.NEXT_PUBLIC_HALAXY_BASE_URL;
  const apiKey = process.env.HALAXY_API_KEY || process.env.NEXT_PUBLIC_HALAXY_API_KEY;
  
  if (!baseUrl || !apiKey) {
    throw new Error('Missing Halaxy configuration');
  }
  
  return { baseUrl, apiKey };
};

/**
 * Halaxy API client with 5-minute TTL cache
 */
export class HalaxyClient {
  private config: HalaxyConfig;
  private cache = new Map<string, { data: any; expires: number }>();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.config = getHalaxyConfig();
  }

  private getCacheKey(endpoint: string, params?: Record<string, any>): string {
    return `${endpoint}_${JSON.stringify(params || {})}`;
  }

  private isExpired(timestamp: number): boolean {
    return Date.now() > timestamp;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.config.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`Halaxy API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Halaxy API request failed:', error);
      // Return empty data for graceful degradation
      return { data: [], error: 'Service temporarily unavailable' };
    }
  }

  /**
   * Get patient appointments with caching
   */
  async getAppointments(patientId: string) {
    const cacheKey = this.getCacheKey('/appointments', { patientId });
    const cached = this.cache.get(cacheKey);
    
    if (cached && !this.isExpired(cached.expires)) {
      return cached.data;
    }

    const data = await this.makeRequest(`/appointments?patient_id=${patientId}`);
    
    this.cache.set(cacheKey, {
      data,
      expires: Date.now() + this.CACHE_TTL
    });
    
    return data;
  }

  /**
   * Get patient invoices with caching
   */
  async getInvoices(patientId: string) {
    const cacheKey = this.getCacheKey('/invoices', { patientId });
    const cached = this.cache.get(cacheKey);
    
    if (cached && !this.isExpired(cached.expires)) {
      return cached.data;
    }

    const data = await this.makeRequest(`/invoices?patient_id=${patientId}`);
    
    this.cache.set(cacheKey, {
      data,
      expires: Date.now() + this.CACHE_TTL
    });
    
    return data;
  }

  /**
   * Get patient documents with caching
   */
  async getDocuments(patientId: string) {
    const cacheKey = this.getCacheKey('/documents', { patientId });
    const cached = this.cache.get(cacheKey);
    
    if (cached && !this.isExpired(cached.expires)) {
      return cached.data;
    }

    const data = await this.makeRequest(`/documents?patient_id=${patientId}`);
    
    this.cache.set(cacheKey, {
      data,
      expires: Date.now() + this.CACHE_TTL
    });
    
    return data;
  }

  /**
   * Get patient profile with caching
   */
  async getPatient(patientId: string) {
    const cacheKey = this.getCacheKey('/patients', { patientId });
    const cached = this.cache.get(cacheKey);
    
    if (cached && !this.isExpired(cached.expires)) {
      return cached.data;
    }

    const data = await this.makeRequest(`/patients/${patientId}`);
    
    this.cache.set(cacheKey, {
      data,
      expires: Date.now() + this.CACHE_TTL
    });
    
    return data;
  }
}

export const halaxyClient = new HalaxyClient();