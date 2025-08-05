import { useContext } from 'react';
import DataContext, { type DataContextType } from '../contexts/DataContext';

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
