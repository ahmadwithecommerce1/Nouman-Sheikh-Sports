/**
 * Firebase Realtime Database Adapter Skeleton for Sheikh Nouman Sports
 * 
 * Future-Proofing for Firebase Realtime Database:
 * Database Reference path: `https://<YOUR-PROJECT-ID>-default-rtdb.firebaseio.com/products.json`
 * 
 * When you are ready to connect your live Firebase Realtime Database:
 * 1. Open Admin Panel -> "Firebase Realtime DB" tab
 * 2. Paste your Database URL (e.g. `https://sheikh-nouman-sports-default-rtdb.firebaseio.com`)
 *    and Firebase Web Config.
 * 3. The service will automatically sync new products created in the Admin panel to your Realtime DB!
 */

import { Product } from '../types';

export interface FirebaseRealtimeConfig {
  apiKey: string;
  databaseURL: string;
  projectId: string;
  appId?: string;
}

class FirebaseRealtimeDatabaseAdapter {
  private config: FirebaseRealtimeConfig | null = null;
  private isConnected = false;

  constructor() {
    this.loadSavedConfig();
  }

  loadSavedConfig(): FirebaseRealtimeConfig | null {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem('sns_firebase_rtdb_config');
      if (stored) {
        this.config = JSON.parse(stored);
        this.isConnected = !!this.config?.databaseURL;
        return this.config;
      }
    } catch (e) {
      console.warn('Could not read Realtime DB config:', e);
    }
    return null;
  }

  saveConfig(config: FirebaseRealtimeConfig): boolean {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.setItem('sns_firebase_rtdb_config', JSON.stringify(config));
      this.config = config;
      this.isConnected = !!config.databaseURL;
      return true;
    } catch (e) {
      console.error('Failed to save Realtime DB config:', e);
      return false;
    }
  }

  removeConfig(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('sns_firebase_rtdb_config');
    this.config = null;
    this.isConnected = false;
  }

  getIsConnected(): boolean {
    return this.isConnected && !!this.config?.databaseURL;
  }

  getConfig(): FirebaseRealtimeConfig | null {
    return this.config;
  }

  /**
   * Fetches all products from Firebase Realtime Database via REST endpoint:
   * GET `${databaseURL}/products.json`
   */
  async fetchRemoteProducts(): Promise<Product[] | null> {
    if (!this.getIsConnected() || !this.config?.databaseURL) return null;
    try {
      const url = `${this.config.databaseURL.replace(/\/$/, '')}/products.json`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!data) return [];
      
      // Convert Object map to Array
      if (typeof data === 'object') {
        return Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
      }
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.warn('Realtime Database fetch failed (check rules or network):', err);
      return null;
    }
  }

  /**
   * Pushes / updates product in Firebase Realtime Database:
   * PUT `${databaseURL}/products/${productId}.json`
   */
  async uploadProduct(product: Product): Promise<boolean> {
    if (!this.getIsConnected() || !this.config?.databaseURL) return false;
    try {
      const url = `${this.config.databaseURL.replace(/\/$/, '')}/products/${product.id}.json`;
      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      return res.ok;
    } catch (err) {
      console.error('Realtime Database upload error:', err);
      return false;
    }
  }

  /**
   * Deletes a product from Firebase Realtime Database:
   * DELETE `${databaseURL}/products/${productId}.json`
   */
  async deleteProduct(productId: string): Promise<boolean> {
    if (!this.getIsConnected() || !this.config?.databaseURL) return false;
    try {
      const url = `${this.config.databaseURL.replace(/\/$/, '')}/products/${productId}.json`;
      const res = await fetch(url, { method: 'DELETE' });
      return res.ok;
    } catch (err) {
      console.error('Realtime Database delete error:', err);
      return false;
    }
  }
}

export const firebaseRealtimeAdapter = new FirebaseRealtimeDatabaseAdapter();
