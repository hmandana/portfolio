// Hybrid data service that can use GraphQL or fallback to static JSON data
import { ApolloClient } from '@apollo/client';
import type { DocumentNode, TypedDocumentNode } from '@apollo/client';
import { staticDataService, type Project, type Profile, type HomeData } from './staticDataService';
import { 
  GET_PROJECTS, 
  GET_PROJECT, 
  GET_PROFILE, 
  GET_HOME_DATA
} from '../graphql/queries';

export interface DataServiceConfig {
  useStaticFallback: boolean;
  apolloClient?: ApolloClient<unknown>;
  timeoutMs?: number;
}

// GraphQL response interfaces
interface ProjectsResponse {
  projects: Project[];
}

interface ProjectResponse {
  project: Project | null;
}

interface ProfileResponse {
  profile: Profile;
}

interface HomeDataResponse {
  homeData: HomeData;
}

class HybridDataService {
  private config: DataServiceConfig;
  private isGraphQLAvailable: boolean | null = null;

  constructor(config: DataServiceConfig) {
    this.config = {
      timeoutMs: 5000, // 5 second timeout
      ...config
    };
  }

  private async testGraphQLConnection(): Promise<boolean> {
    if (!this.config.apolloClient) {
      return false;
    }

    try {
      // Test with a simple query with timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('GraphQL connection timeout')), this.config.timeoutMs);
      });

      const queryPromise = this.config.apolloClient.query({
        query: GET_HOME_DATA,
        fetchPolicy: 'network-only',
        errorPolicy: 'none'
      });

      await Promise.race([queryPromise, timeoutPromise]);
      return true;
    } catch (error) {
      console.warn('GraphQL connection failed, falling back to static data:', error);
      return false;
    }
  }

  private async checkGraphQLAvailability(): Promise<boolean> {
    if (this.isGraphQLAvailable !== null) {
      return this.isGraphQLAvailable;
    }

    if (!this.config.useStaticFallback) {
      this.isGraphQLAvailable = true;
      return true;
    }

    this.isGraphQLAvailable = await this.testGraphQLConnection();
    return this.isGraphQLAvailable;
  }

  private async executeGraphQLQuery<T>(query: DocumentNode | TypedDocumentNode<T, Record<string, unknown>>, variables?: Record<string, unknown>): Promise<T> {
    if (!this.config.apolloClient) {
      throw new Error('Apollo client not configured');
    }

    const result = await this.config.apolloClient.query<T>({
      query: query as DocumentNode,
      variables,
      fetchPolicy: 'cache-first',
      errorPolicy: 'all'
    });

    if (result.errors && result.errors.length > 0) {
      throw new Error(`GraphQL query failed: ${result.errors[0].message}`);
    }

    return result.data;
  }

  async getProjects(): Promise<Project[]> {
    const isAvailable = await this.checkGraphQLAvailability();
    
    if (isAvailable) {
      try {
        const data = await this.executeGraphQLQuery<ProjectsResponse>(GET_PROJECTS);
        return data.projects || [];
      } catch (error) {
        console.warn('GraphQL query failed, falling back to static data:', error);
        this.isGraphQLAvailable = false;
      }
    }

    return staticDataService.getProjects();
  }

  async getProject(id: string): Promise<Project | null> {
    const isAvailable = await this.checkGraphQLAvailability();
    
    if (isAvailable) {
      try {
        // Convert string id to number for GraphQL query
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
          throw new Error('Invalid project ID');
        }
        const data = await this.executeGraphQLQuery<ProjectResponse>(GET_PROJECT, { id: numericId });
        return data.project || null;
      } catch (error) {
        console.warn('GraphQL query failed, falling back to static data:', error);
        this.isGraphQLAvailable = false;
      }
    }

    return staticDataService.getProject(id);
  }

  async getFeaturedProjects(): Promise<Project[]> {
    // Since there's no specific GraphQL query for featured projects,
    // we'll get all projects and filter for featured ones
    const projects = await this.getProjects();
    return projects.filter(project => project.featured);
  }

  async getProfile(): Promise<Profile> {
    const isAvailable = await this.checkGraphQLAvailability();
    
    if (isAvailable) {
      try {
        const data = await this.executeGraphQLQuery<ProfileResponse>(GET_PROFILE);
        return data.profile;
      } catch (error) {
        console.warn('GraphQL query failed, falling back to static data:', error);
        this.isGraphQLAvailable = false;
      }
    }

    return staticDataService.getProfile();
  }

  async getHomeData(): Promise<HomeData> {
    const isAvailable = await this.checkGraphQLAvailability();
    
    if (isAvailable) {
      try {
        const data = await this.executeGraphQLQuery<HomeDataResponse>(GET_HOME_DATA);
        return data.homeData;
      } catch (error) {
        console.warn('GraphQL query failed, falling back to static data:', error);
        this.isGraphQLAvailable = false;
      }
    }

    return staticDataService.getHomeData();
  }

  // Utility methods
  async getProjectsByType(type: 'personal' | 'professional'): Promise<Project[]> {
    const projects = await this.getProjects();
    return projects.filter(project => project.type === type);
  }

  async getProjectsByTechnology(technology: string): Promise<Project[]> {
    const projects = await this.getProjects();
    return projects.filter(project => 
      project.technologies.some(tech => 
        tech.toLowerCase().includes(technology.toLowerCase())
      )
    );
  }

  async searchProjects(query: string): Promise<Project[]> {
    const projects = await this.getProjects();
    const lowercaseQuery = query.toLowerCase();
    
    return projects.filter(project => 
      project.title.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      project.technologies.some(tech => tech.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Status methods
  isUsingGraphQL(): boolean | null {
    return this.isGraphQLAvailable;
  }

  getDataSource(): string {
    if (this.isGraphQLAvailable === null) return 'unknown';
    return this.isGraphQLAvailable ? 'graphql' : 'static';
  }

  // Force refresh of GraphQL availability check
  async refreshConnection(): Promise<boolean> {
    this.isGraphQLAvailable = null;
    return this.checkGraphQLAvailability();
  }
}

export default HybridDataService;
export { HybridDataService };
