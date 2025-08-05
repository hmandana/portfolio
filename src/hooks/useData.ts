import { useContext, useEffect, useState, useCallback } from 'react';
import DataContext, { type DataContextType } from '../contexts/DataContext';
import type { Project, Profile, HomeData } from '../services/staticDataService';

// Interface for raw JSON project data
interface RawProjectData {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  Company?: string;
  demoLink?: string | null;
  githubLink?: string | null;
  type: 'personal' | 'professional';
}

// Load actual data from JSON files when DataProvider is not available
const useBackupData = (): DataContextType => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBackupData = useCallback(async () => {
    try {
      console.warn('⚠️ useData hook called outside of DataProvider - loading backup data from JSON files');
      setLoading(true);

      // Load all data files in parallel
      const [projectsResponse, profileResponse, homeDataResponse] = await Promise.all([
        fetch('/data/projects.json'),
        fetch('/data/profile.json'), 
        fetch('/data/homedata.json')
      ]);

      if (!projectsResponse.ok || !profileResponse.ok || !homeDataResponse.ok) {
        throw new Error('Failed to load backup data files');
      }

      const [projectsData, profileData, homeDataData] = await Promise.all([
        projectsResponse.json(),
        profileResponse.json(),
        homeDataResponse.json()
      ]);

      // Transform projects data to match our interface
      const transformedProjects = (projectsData as RawProjectData[]).map((project: RawProjectData) => ({
        ...project,
        id: String(project.id), // Convert numeric ID to string
        featured: project.type === 'personal', // Assume personal projects are featured
        status: 'completed' as const,
        startDate: '2024-01-01',
        endDate: project.type === 'professional' ? '2024-12-31' : null
      }));

      // Transform profile data to match our interface  
      const transformedProfile: Profile = {
        id: 'profile-1',
        name: profileData.name,
        email: 'contact@harithamandanapu.com',
        phone: '+1-234-567-8900',
        location: 'Remote',
        website: 'https://harithamandanapu.com',
        linkedin: 'https://linkedin.com/in/harithamandanapu',
        github: 'https://github.com/hmandana',
        summary: profileData.summary.join(' '),
        avatar: '/assets/profile/avatar.jpg',
        resume: '/assets/resume.pdf',
        skills: profileData.skills || [],
        workExperience: profileData.workExperience || [],
        education: profileData.education || [],
        certifications: profileData.certifications || []
      };

      // Transform home data to match our interface
      const transformedHomeData: HomeData = {
        id: 'home-1',
        name: homeDataData.name,
        roles: homeDataData.roles || [],
        intro: homeDataData.intro.join(' '),
        tagline: 'Building the future, one line of code at a time',
        avatar: '/assets/profile/avatar.jpg',
        backgroundImage: '/assets/background.jpg',
        stats: {
          yearsExperience: homeDataData.stats?.yearsExperience || 10,
          technologiesCount: homeDataData.stats?.technologiesCount || 50,
          projectsDelivered: homeDataData.stats?.projectsDelivered || 12,
          clientsSatisfied: 30
        },
        highlights: [],
        socialLinks: [
          { platform: 'GitHub', url: 'https://github.com/hmandana', icon: 'github' },
          { platform: 'LinkedIn', url: 'https://linkedin.com/in/harithamandanapu', icon: 'linkedin' }
        ],
        availability: {
          status: 'available',
          message: 'Available for new opportunities',
          lastUpdated: new Date().toISOString()
        }
      };

      setProjects(transformedProjects);
      setProfile(transformedProfile);
      setHomeData(transformedHomeData);
      setError(null);
      
      console.log('✅ Backup data loaded successfully from JSON files');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load backup data';
      setError(errorMessage);
      console.error('❌ Failed to load backup data:', err);
      
      // Fallback to minimal hardcoded data
      setProjects([{
        id: 'fallback-1',
        title: 'Portfolio Website',
        description: 'A responsive portfolio website built with React and TypeScript',
        technologies: ['React', 'TypeScript', 'Tailwind CSS'],
        demoLink: null,
        githubLink: null,
        type: 'personal',
        featured: true,
        status: 'completed',
        startDate: '2024-01-01',
        endDate: null
      }]);
      setProfile({
        id: 'fallback-profile',
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
      });
      setHomeData({
        id: 'fallback-home',
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
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBackupData();
  }, [loadBackupData]);

  return {
    // Data
    projects,
    profile,
    homeData,
    
    // Loading states
    projectsLoading: loading,
    profileLoading: loading,
    homeDataLoading: loading,
    
    // Error states
    projectsError: error,
    profileError: error,
    homeDataError: error,
    
    // Service info
    dataSource: error ? 'fallback-hardcoded' : 'backup-json',
    isUsingGraphQL: false,
    
    // Methods
    refetchProjects: loadBackupData,
    refetchProfile: loadBackupData,
    refetchHomeData: loadBackupData,
    refreshConnection: async () => {
      console.warn('⚠️ Cannot refresh connection - DataProvider not available');
      return false;
    }
  };
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  
  if (context === undefined) {
    // Instead of throwing an error, return backup data loaded from JSON files
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useBackupData();
  }
  
  return context;
};
