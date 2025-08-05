import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useApolloClient } from '@apollo/client';
import { HybridDataService, type DataServiceConfig } from '../services/dataService';
import { type Project, type Profile, type HomeData } from '../services/staticDataService';

export interface DataContextType {
  // Data
  projects: Project[];
  profile: Profile | null;
  homeData: HomeData | null;
  
  // Loading states
  projectsLoading: boolean;
  profileLoading: boolean;
  homeDataLoading: boolean;
  
  // Error states
  projectsError: string | null;
  profileError: string | null;
  homeDataError: string | null;
  
  // Service info
  dataSource: string;
  isUsingGraphQL: boolean | null;
  
  // Methods
  refetchProjects: () => Promise<void>;
  refetchProfile: () => Promise<void>;
  refetchHomeData: () => Promise<void>;
  refreshConnection: () => Promise<boolean>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
  useStaticFallback?: boolean;
}

export const DataProvider: React.FC<DataProviderProps> = ({ 
  children, 
  useStaticFallback = true 
}) => {
  const apolloClient = useApolloClient();
  
  // Initialize data service
  const [dataService] = useState(() => {
    const config: DataServiceConfig = {
      useStaticFallback,
      apolloClient,
      timeoutMs: 5000
    };
    return new HybridDataService(config);
  });

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [homeData, setHomeData] = useState<HomeData | null>(null);

  // Loading states
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [homeDataLoading, setHomeDataLoading] = useState(true);

  // Error states
  const [projectsError, setProjectsError] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [homeDataError, setHomeDataError] = useState<string | null>(null);

  // Service states
  const [dataSource, setDataSource] = useState('unknown');
  const [isUsingGraphQL, setIsUsingGraphQL] = useState<boolean | null>(null);

  // Fetch methods
  const fetchProjects = async () => {
    setProjectsLoading(true);
    setProjectsError(null);
    try {
      const data = await dataService.getProjects();
      setProjects(data);
      setDataSource(dataService.getDataSource());
      setIsUsingGraphQL(dataService.isUsingGraphQL());
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load projects';
      setProjectsError(errorMessage);
      console.error('Error fetching projects:', error);
    } finally {
      setProjectsLoading(false);
    }
  };

  const fetchProfile = async () => {
    setProfileLoading(true);
    setProfileError(null);
    try {
      const data = await dataService.getProfile();
      setProfile(data);
      setDataSource(dataService.getDataSource());
      setIsUsingGraphQL(dataService.isUsingGraphQL());
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load profile';
      setProfileError(errorMessage);
      console.error('Error fetching profile:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  const fetchHomeData = async () => {
    setHomeDataLoading(true);
    setHomeDataError(null);
    try {
      const data = await dataService.getHomeData();
      setHomeData(data);
      setDataSource(dataService.getDataSource());
      setIsUsingGraphQL(dataService.isUsingGraphQL());
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load home data';
      setHomeDataError(errorMessage);
      console.error('Error fetching home data:', error);
    } finally {
      setHomeDataLoading(false);
    }
  };

  const refreshConnection = async (): Promise<boolean> => {
    const isAvailable = await dataService.refreshConnection();
    setDataSource(dataService.getDataSource());
    setIsUsingGraphQL(dataService.isUsingGraphQL());
    return isAvailable;
  };

  // Initial data fetch
  useEffect(() => {
    const loadInitialData = async () => {
      await Promise.all([
        fetchProjects(),
        fetchProfile(),
        fetchHomeData()
      ]);
    };

    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check if we should use static data based on environment variable
  useEffect(() => {
    const shouldUseStaticData = import.meta.env.VITE_USE_STATIC_DATA === 'true';
    if (shouldUseStaticData) {
      console.log('🔄 Using static data mode (GitHub Pages deployment)');
    }
  }, []);

  const contextValue: DataContextType = {
    // Data
    projects,
    profile,
    homeData,
    
    // Loading states
    projectsLoading,
    profileLoading,
    homeDataLoading,
    
    // Error states
    projectsError,
    profileError,
    homeDataError,
    
    // Service info
    dataSource,
    isUsingGraphQL,
    
    // Methods
    refetchProjects: fetchProjects,
    refetchProfile: fetchProfile,
    refetchHomeData: fetchHomeData,
    refreshConnection
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
