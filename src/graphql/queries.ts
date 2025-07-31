import { gql } from '@apollo/client';

// Project queries
export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      title
      description
      technologies
      Company
      demoLink
      githubLink
      type
      createdAt
      updatedAt
    }
  }
`;

export const GET_PROJECTS_BY_TYPE = gql`
  query GetProjectsByType($type: ProjectType!) {
    projectsByType(type: $type) {
      id
      title
      description
      technologies
      Company
      demoLink
      githubLink
      type
      createdAt
      updatedAt
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProject($id: Int!) {
    project(id: $id) {
      id
      title
      description
      technologies
      Company
      demoLink
      githubLink
      type
      createdAt
      updatedAt
    }
  }
`;

// Profile/About queries
export const GET_PROFILE = gql`
  query GetProfile {
    profile {
      name
      summary
      skills {
        name
        image
      }
      workExperience {
        title
        company
        years
        details
      }
      education {
        degree
        school
        year
        details
      }
      certifications {
        name
        org
        year
        details
      }
      interests
      contact {
        type
        value
        icon
      }
    }
  }
`;

// Home page queries
export const GET_HOME_DATA = gql`
  query GetHomeData {
    homeData {
      name
      roles
      intro
      stats {
        yearsExperience
        technologiesCount
        projectsDelivered
      }
    }
  }
`;

// Utility queries
export const GET_ALL_TECHNOLOGIES = gql`
  query GetAllTechnologies {
    allTechnologies
  }
`;

// Mutations
export const CREATE_PROJECT = gql`
  mutation CreateProject($input: ProjectInput!) {
    createProject(input: $input) {
      id
      title
      description
      technologies
      Company
      demoLink
      githubLink
      type
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: Int!, $input: ProjectInput!) {
    updateProject(id: $id, input: $input) {
      id
      title
      description
      technologies
      Company
      demoLink
      githubLink
      type
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: Int!) {
    deleteProject(id: $id)
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: ProfileInput!) {
    updateProfile(input: $input) {
      name
      summary
      interests
    }
  }
`;
