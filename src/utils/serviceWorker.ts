// Service Worker utilities for cache management

export interface ServiceWorkerConfig {
  enabled: boolean;
  swPath: string;
  cacheDuration: number;
  enableNotifications: boolean;
}

const defaultConfig: ServiceWorkerConfig = {
  enabled: true,
  swPath: '/sw.js',
  cacheDuration: 5 * 60 * 1000, // 5 minutes
  enableNotifications: true,
};

class ServiceWorkerManager {
  private config: ServiceWorkerConfig;
  private registration: ServiceWorkerRegistration | null = null;

  constructor(config: Partial<ServiceWorkerConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  /**
   * Register the service worker
   */
  async register(): Promise<ServiceWorkerRegistration | null> {
    if (!this.isSupported() || !this.config.enabled) {
      console.log('Service Worker not supported or disabled');
      return null;
    }

    try {
      console.log('Registering Service Worker...');
      this.registration = await navigator.serviceWorker.register(this.config.swPath, {
        scope: '/',
      });

      console.log('Service Worker registered successfully:', this.registration);

      // Handle updates
      this.handleUpdates();

      // Listen for messages from SW
      this.setupMessageListener();

      return this.registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }

  /**
   * Unregister the service worker
   */
  async unregister(): Promise<boolean> {
    if (!this.registration) {
      return false;
    }

    try {
      const success = await this.registration.unregister();
      console.log('Service Worker unregistered:', success);
      return success;
    } catch (error) {
      console.error('Service Worker unregistration failed:', error);
      return false;
    }
  }

  /**
   * Clear all caches
   */
  async clearCache(): Promise<void> {
    if (!this.registration || !this.registration.active) {
      // Fallback: clear caches directly
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
      console.log('Caches cleared directly');
      return;
    }

    // Send message to service worker to clear cache
    this.registration.active.postMessage({ type: 'CLEAR_CACHE' });
    console.log('Cache clear message sent to service worker');
  }

  /**
   * Force update the service worker
   */
  async forceUpdate(): Promise<void> {
    if (!this.registration) {
      console.warn('No service worker registration found');
      return;
    }

    try {
      await this.registration.update();
      console.log('Service worker update check completed');
    } catch (error) {
      console.error('Service worker update failed:', error);
    }
  }

  /**
   * Get cache status and size
   */
  async getCacheInfo(): Promise<{ name: string; size: number; entries: number }[]> {
    const cacheNames = await caches.keys();
    const cacheInfo = [];

    for (const name of cacheNames) {
      const cache = await caches.open(name);
      const requests = await cache.keys();
      let totalSize = 0;

      for (const request of requests) {
        const response = await cache.match(request);
        if (response) {
          const blob = await response.blob();
          totalSize += blob.size;
        }
      }

      cacheInfo.push({
        name,
        size: totalSize,
        entries: requests.length,
      });
    }

    return cacheInfo;
  }

  /**
   * Check if service workers are supported
   */
  private isSupported(): boolean {
    return 'serviceWorker' in navigator;
  }

  /**
   * Handle service worker updates
   */
  private handleUpdates(): void {
    if (!this.registration) return;

    this.registration.addEventListener('updatefound', () => {
      const newWorker = this.registration!.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // New content available
            console.log('New content available, please refresh.');
            
            if (this.config.enableNotifications) {
              this.showUpdateNotification();
            }
          } else {
            // Content cached for first time
            console.log('Content cached for offline use.');
          }
        }
      });
    });
  }

  /**
   * Setup message listener for service worker communication
   */
  private setupMessageListener(): void {
    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log('Message from service worker:', event.data);
      
      // Handle different message types here
      if (event.data.type === 'CACHE_UPDATED') {
        console.log('Cache updated:', event.data.url);
      }
    });
  }

  /**
   * Show update notification to user
   */
  private showUpdateNotification(): void {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #007bff;
      color: white;
      padding: 15px 20px;
      border-radius: 5px;
      z-index: 10000;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;
    notification.innerHTML = `
      <div>New content available!</div>
      <button onclick="window.location.reload()" style="
        background: rgba(255,255,255,0.2);
        border: 1px solid rgba(255,255,255,0.3);
        color: white;
        padding: 5px 10px;
        border-radius: 3px;
        margin-top: 10px;
        cursor: pointer;
      ">Refresh</button>
      <button onclick="this.parentElement.remove()" style="
        background: transparent;
        border: none;
        color: white;
        float: right;
        cursor: pointer;
        font-size: 18px;
        margin-top: -5px;
      ">&times;</button>
    `;

    document.body.appendChild(notification);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 10000);
  }
}

// Create singleton instance
export const serviceWorkerManager = new ServiceWorkerManager();

// Utility functions
export const swUtils = {
  /**
   * Initialize service worker with default config
   */
  init: (config?: Partial<ServiceWorkerConfig>) => {
    const manager = new ServiceWorkerManager(config);
    return manager.register();
  },

  /**
   * Clear all application caches
   */
  clearCache: () => serviceWorkerManager.clearCache(),

  /**
   * Force service worker update
   */
  forceUpdate: () => serviceWorkerManager.forceUpdate(),

  /**
   * Get cache information
   */
  getCacheInfo: () => serviceWorkerManager.getCacheInfo(),

  /**
   * Format bytes to human readable format
   */
  formatBytes: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
};

export default serviceWorkerManager;
