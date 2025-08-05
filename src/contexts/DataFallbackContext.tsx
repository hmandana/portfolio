import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

interface HomeData {
  id: string;
  name: string;
  roles: string[];
  intro: string[];
  stats: {
    yearsExperience: number;
    technologiesCount: number;
    projectsDelivered: number;
  };
}

interface Profile {
  id: string;
  name: string;
  summary: string[];
  skills: Array<{
    name: string;
    image: string;
  }>;
  workExperience: Array<{
    title: string;
    company: string;
    years?: string;
    details?: string[];
  }>;
  education: Array<{
    degree: string;
    school: string;
    year?: string;
    details?: string;
  }>;
  certifications: Array<{
    name: string;
    org?: string;
    year?: string;
    details?: string;
  }>;
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  Company?: string;
  demoLink?: string;
  githubLink?: string;
}

interface StaticData {
  homeData: HomeData | null;
  profile: Profile | null;
  projects: Project[] | null;
}

export interface DataFallbackState {
  staticData: StaticData;
  isUsingFallback: boolean;
  isOnline: boolean;
  loadStaticData: () => Promise<void>;
  clearCache: () => Promise<void>;
}

const DataFallbackContext = createContext<DataFallbackState | null>(null);

export { DataFallbackContext };

interface DataFallbackProviderProps {
  children: ReactNode;
}

export const DataFallbackProvider: React.FC<DataFallbackProviderProps> = ({ children }) => {
  const [staticData, setStaticData] = useState<StaticData>({
    homeData: null,
    profile: null,
    projects: null
  });
  
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);


  // Load static data from service worker cache or fetch
  const loadStaticData = useCallback(async (): Promise<void> => {
    try {
      console.log('🔄 Loading static data fallback...');
      setIsUsingFallback(true);

      // Try to get data from service worker cache first
      const cachedData = await getDataFromServiceWorker();
      
      if (cachedData.homeData && cachedData.profile && cachedData.projects) {
        console.log('✅ Loaded data from service worker cache');
        setStaticData(cachedData);
        return;
      }

      // Fallback to direct fetch
      console.log('📡 Fetching static data files...');
      const [homeResponse, profileResponse, projectsResponse] = await Promise.all([
        fetch('/data/homedata.json'),
        fetch('/data/profile.json'),
        fetch('/data/projects.json')
      ]);

      if (!homeResponse.ok || !profileResponse.ok || !projectsResponse.ok) {
        throw new Error('Failed to fetch static data files');
      }

      const [homeData, profile, projects] = await Promise.all([
        homeResponse.json(),
        profileResponse.json(),
        projectsResponse.json()
      ]);

      const newStaticData = { homeData, profile, projects };
      setStaticData(newStaticData);

      // Cache the data for future use
      await cacheStaticData(newStaticData);
      console.log('✅ Static data loaded and cached successfully');

    } catch (error) {
      console.error('❌ Failed to load static data:', error);
      
      // Try to load from localStorage as last resort
      const localData = loadFromLocalStorage();
      if (localData.homeData || localData.profile || localData.projects) {
        console.log('💾 Using localStorage backup data');
        setStaticData(localData);
      }
    }
  }, []);

  // Get data from service worker cache
  const getDataFromServiceWorker = async (): Promise<StaticData> => {
    try {
      if ('caches' in window) {
        const cache = await caches.open('portfolio-data-v1');
        
        const [homeCache, profileCache, projectsCache] = await Promise.all([
          cache.match('/data/homedata.json'),
          cache.match('/data/profile.json'),
          cache.match('/data/projects.json')
        ]);

        const results = await Promise.all([
          homeCache?.json(),
          profileCache?.json(),
          projectsCache?.json()
        ]);

        return {
          homeData: results[0],
          profile: results[1],
          projects: results[2]
        };
      }
    } catch (error) {
      console.warn('⚠️ Failed to get data from service worker cache:', error);
    }
    
    return { homeData: null, profile: null, projects: null };
  };

  // Cache static data in service worker and localStorage
  const cacheStaticData = async (data: StaticData): Promise<void> => {
    try {
      // Cache in service worker
      if ('caches' in window) {
        const cache = await caches.open('portfolio-data-v1');
        
        await Promise.all([
          cache.put('/data/homedata.json', new Response(JSON.stringify(data.homeData))),
          cache.put('/data/profile.json', new Response(JSON.stringify(data.profile))),
          cache.put('/data/projects.json', new Response(JSON.stringify(data.projects)))
        ]);
      }

      // Backup in localStorage
      localStorage.setItem('portfolio-static-data', JSON.stringify(data));
      localStorage.setItem('portfolio-data-timestamp', Date.now().toString());
      
    } catch (error) {
      console.warn('⚠️ Failed to cache static data:', error);
    }
  };

  // Load from localStorage backup
  const loadFromLocalStorage = (): StaticData => {
    try {
      const stored = localStorage.getItem('portfolio-static-data');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('⚠️ Failed to load from localStorage:', error);
    }
    
    return { homeData: null, profile: null, projects: null };
  };

  // Clear all cached data
  const clearCache = async (): Promise<void> => {
    try {
      // Clear service worker cache
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(name => caches.delete(name))
        );
      }

      // Clear localStorage
      localStorage.removeItem('portfolio-static-data');
      localStorage.removeItem('portfolio-data-timestamp');

      // Reset state
      setStaticData({ homeData: null, profile: null, projects: null });
      setIsUsingFallback(false);

      console.log('🗑️ All cached data cleared');
    } catch (error) {
      console.error('❌ Failed to clear cache:', error);
    }
  };

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      console.log('🌐 Back online - GraphQL available');
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      console.log('📴 Offline - Will use static data fallback');
      loadStaticData();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [loadStaticData]);

  // Initialize static data on mount
  useEffect(() => {
    // Load static data immediately if offline or as backup
    if (!isOnline) {
      loadStaticData();
    } else {
      // Preload static data in background for future use
      loadStaticData().then(() => {
        console.log('📦 Static data preloaded for fallback use');
      });
    }
  }, [isOnline, loadStaticData]);

  const value: DataFallbackState = {
    staticData,
    isUsingFallback,
    isOnline,
    loadStaticData,
    clearCache
  };

  return (
    <DataFallbackContext.Provider value={value}>
      {children}
    </DataFallbackContext.Provider>
  );
};

export default DataFallbackProvider;
