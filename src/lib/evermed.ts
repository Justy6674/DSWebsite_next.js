'use client';

/**
 * Evermed API Integration
 * Prescription and clinical documentation system
 */

interface EvermedConfig {
  baseUrl: string;
  apiKey: string;
}

const getEvermedConfig = (): EvermedConfig => {
  const baseUrl = process.env.EVERMED_BASE_URL || import.meta.env.VITE_EVERMED_BASE_URL;
  const apiKey = process.env.EVERMED_API_KEY || import.meta.env.VITE_EVERMED_API_KEY;
  
  if (!baseUrl || !apiKey) {
    throw new Error('Missing Evermed configuration');
  }
  
  return { baseUrl, apiKey };
};

/**
 * Evermed API client for prescription management
 */
export class EvermedClient {
  private config: EvermedConfig;

  constructor() {
    this.config = getEvermedConfig();
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
        throw new Error(`Evermed API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Evermed API request failed:', error);
      // Return empty data for graceful degradation
      return { data: [], error: 'Service temporarily unavailable' };
    }
  }

  /**
   * Get patient prescriptions
   */
  async getPrescriptions(patientId: string) {
    return await this.makeRequest(`/prescriptions?patient_id=${patientId}`);
  }

  /**
   * Create new prescription (stub for Phase 2)
   */
  async createPrescription(prescriptionData: any) {
    console.log('Prescription creation stubbed for Phase 2:', prescriptionData);
    return { success: true, message: 'Prescription creation will be implemented in Phase 2' };
  }

  /**
   * Get prescription history
   */
  async getPrescriptionHistory(patientId: string) {
    return await this.makeRequest(`/prescriptions/history?patient_id=${patientId}`);
  }
}

export const evermedClient = new EvermedClient();