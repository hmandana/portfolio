// Static data service for GitHub Pages deployment fallback
// This service provides data when GraphQL API is not available

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  demoLink?: string | null;
  githubLink?: string | null;
  imageUrl?: string;
  type: 'personal' | 'professional';
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  startDate: string;
  endDate?: string | null;
  Company?: string;
}

export interface Skill {
  name: string;
  image: string;
  category: string;
  proficiency: number;
}

export interface WorkExperience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  url: string;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  avatar: string;
  resume: string;
  skills: Skill[];
  workExperience: WorkExperience[];
  education: Education[];
  certifications: Certification[];
}

export interface HomeData {
  id: string;
  name: string;
  roles: string[];
  intro: string;
  tagline: string;
  avatar: string;
  backgroundImage: string;
  stats: {
    yearsExperience: number;
    technologiesCount: number;
    projectsDelivered: number;
    clientsSatisfied: number;
  };
  highlights: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  socialLinks: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
  availability: {
    status: string;
    message: string;
    lastUpdated: string;
  };
}

class StaticDataService {
  private baseUrl: string;

  constructor() {
    // Use relative path for GitHub Pages, or CDN URL for other deployments
    this.baseUrl = import.meta.env.DEV 
      ? '' 
      : import.meta.env.VITE_STATIC_DATA_URL || '';
  }

  private async fetchData<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}/data/${endpoint}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  async getProjects(): Promise<Project[]> {
    const response = await this.fetchData<{data: {projects: Project[]}}>('projects.json');
    // Transform the data to match our interface
    return response.data.projects.map(project => ({
      ...project,
      id: String(project.id), // Convert numeric ID to string
      demoLink: project.demoLink || null,
      githubLink: project.githubLink || null
    }));
  }

  async getProject(id: string): Promise<Project | null> {
    const projects = await this.getProjects();
    return projects.find(project => project.id === id) || null;
  }

  async getFeaturedProjects(): Promise<Project[]> {
    const projects = await this.getProjects();
    return projects.filter(project => project.featured);
  }

  async getProjectsByType(type: 'personal' | 'professional'): Promise<Project[]> {
    const projects = await this.getProjects();
    return projects.filter(project => project.type === type);
  }

  async getProfile(): Promise<Profile> {
    return this.fetchData<Profile>('profile.json');
  }

  async getHomeData(): Promise<HomeData> {
    return this.fetchData<HomeData>('homedata.json');
  }

  // Helper methods for easy data access
  async getSkills(): Promise<Skill[]> {
    const profile = await this.getProfile();
    return profile.skills;
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    const skills = await this.getSkills();
    return skills.filter(skill => skill.category.toLowerCase() === category.toLowerCase());
  }

  async getWorkExperience(): Promise<WorkExperience[]> {
    const profile = await this.getProfile();
    return profile.workExperience;
  }

  async getEducation(): Promise<Education[]> {
    const profile = await this.getProfile();
    return profile.education;
  }

  async getCertifications(): Promise<Certification[]> {
    const profile = await this.getProfile();
    return profile.certifications;
  }

  // Technology-specific queries
  async getProjectsByTechnology(technology: string): Promise<Project[]> {
    const projects = await this.getProjects();
    return projects.filter(project => 
      project.technologies.some(tech => 
        tech.toLowerCase().includes(technology.toLowerCase())
      )
    );
  }

  // Search functionality
  async searchProjects(query: string): Promise<Project[]> {
    const projects = await this.getProjects();
    const lowercaseQuery = query.toLowerCase();
    
    return projects.filter(project => 
      project.title.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      project.technologies.some(tech => tech.toLowerCase().includes(lowercaseQuery))
    );
  }
}

export const staticDataService = new StaticDataService();
export default staticDataService;
