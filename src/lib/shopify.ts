/**
 * Shopify API Integration
 * E-commerce integration for product entitlements
 */

interface ShopifyConfig {
  storeDomain: string;
  apiKey: string;
  secret: string;
}

const getShopifyConfig = (): ShopifyConfig => {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN || import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
  const apiKey = process.env.SHOPIFY_API_KEY || import.meta.env.VITE_SHOPIFY_API_KEY;
  const secret = process.env.SHOPIFY_SECRET || import.meta.env.VITE_SHOPIFY_SECRET;
  
  if (!storeDomain || !apiKey || !secret) {
    throw new Error('Missing Shopify configuration');
  }
  
  return { storeDomain, apiKey, secret };
};

/**
 * Shopify API client for product entitlements
 */
export class ShopifyClient {
  private config: ShopifyConfig;

  constructor() {
    this.config = getShopifyConfig();
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `https://${this.config.storeDomain}.myshopify.com/admin/api/2024-01${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'X-Shopify-Access-Token': this.config.apiKey,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Shopify API request failed:', error);
      // Return empty data for graceful degradation
      return { data: [], error: 'Service temporarily unavailable' };
    }
  }

  /**
   * Get customer orders (stub for Phase 2)
   */
  async getCustomerOrders(customerId: string) {
    console.log('Shopify customer orders stubbed for Phase 2:', customerId);
    return { 
      orders: [],
      message: 'Shopify integration will be implemented in Phase 2' 
    };
  }

  /**
   * Check product entitlements (stub for Phase 2)
   */
  async checkEntitlements(customerId: string) {
    console.log('Shopify entitlements check stubbed for Phase 2:', customerId);
    return { 
      entitlements: [],
      message: 'Entitlements checking will be implemented in Phase 2' 
    };
  }

  /**
   * Webhook handler for order updates (stub for Phase 2)
   */
  async handleOrderWebhook(webhookData: any) {
    console.log('Shopify webhook handling stubbed for Phase 2:', webhookData);
    return { 
      success: true,
      message: 'Webhook handling will be implemented in Phase 2' 
    };
  }
}

export const shopifyClient = new ShopifyClient();