import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useApolloClient } from '@apollo/client';
import { HybridDataService, type DataServiceConfig } from '../services/dataService';
import { type Project, type Profile, type HomeData } from '../services/staticDataService';

interface DataContextType {
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

// Default/backup data to use when DataProvider is not available
const getBackupData = (): DataContextType => {
  console.warn('⚠️ useData hook called outside of DataProvider - using backup data');
  
  return {
    // Backup data
    projects: [
      {
        id: 'backup-1',
        title: 'Portfolio Website',
        description: 'A responsive portfolio website built with React and TypeScript',
        technologies: ['React', 'TypeScript', 'Tailwind CSS'],
        demoUrl: '#',
        githubUrl: '#',
        type: 'personal',
        featured: true,
        status: 'completed',
        startDate: '2024-01-01',
        endDate: '2024-03-01'
      }
    ],
    profile: {
      id: 'backup-profile',
      name: 'Portfolio Owner',
      email: 'contact@portfolio.com',
      phone: '+1-234-567-8900',
      location: 'Remote',
      website: '#',
      linkedin: '#',
      github: '#',
      summary: 'Full-stack developer with passion for creating amazing web experiences',
      avatar: '/default-avatar.jpg',
      resume: '#',
      skills: [],
      workExperience: [],
      education: [],
      certifications: []
    },
    homeData: {
      id: 'backup-home',
      name: 'Portfolio Owner',
      roles: ['Developer', 'Designer'],
      intro: 'Welcome to my portfolio',
      tagline: 'Building the future, one line of code at a time',
      avatar: '/default-avatar.jpg',
      backgroundImage: '/default-bg.jpg',
      stats: {
        yearsExperience: 5,
        technologiesCount: 20,
        projectsDelivered: 50,
        clientsSatisfied: 30
      },
      highlights: [],
      socialLinks: [],
      availability: {
        status: 'available',
        message: 'Available for new opportunities',
        lastUpdated: new Date().toISOString()
      }
    },
    
    // Loading states (all false for backup)
    projectsLoading: false,
    profileLoading: false,
    homeDataLoading: false,
    
    // Error states (show provider missing error)
    projectsError: 'DataProvider not found - using backup data',
    profileError: 'DataProvider not found - using backup data',
    homeDataError: 'DataProvider not found - using backup data',
    
    // Service info
    dataSource: 'backup-static',
    isUsingGraphQL: false,
    
    // Methods (no-op functions)
    refetchProjects: async () => {
      console.warn('⚠️ Cannot refetch projects - DataProvider not available');
    },
    refetchProfile: async () => {
      console.warn('⚠️ Cannot refetch profile - DataProvider not available');
    },
    refetchHomeData: async () => {
      console.warn('⚠️ Cannot refetch home data - DataProvider not available');
    },
    refreshConnection: async () => {
      console.warn('⚠️ Cannot refresh connection - DataProvider not available');
      return false;
    }
  };
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  
  if (context === undefined) {
    // Instead of throwing an error, return backup data with warnings
    return getBackupData();
  }
  
  return context;
};

export default DataContext;
