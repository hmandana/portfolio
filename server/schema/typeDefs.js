import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Project {
    id: Int!
    title: String!
    description: String!
    technologies: [String!]!
    Company: String
    demoLink: String
    githubLink: String
    type: ProjectType!
    createdAt: String
    updatedAt: String
  }

  enum ProjectType {
    professional
    personal
  }

  type Skill {
    name: String!
    image: String!
  }

  type WorkExperience {
    title: String!
    company: String!
    years: String!
    details: [String]
  }

  type Education {
    degree: String!
    school: String!
    year: String!
    details: String
  }

  type Certification {
    name: String!
    org: String!
    year: String!
    details: String
  }

  type Contact {
    type: String!
    value: String!
    icon: String
  }

  type Profile {
    name: String!
    summary: [String!]!
    skills: [Skill!]!
    workExperience: [WorkExperience!]!
    education: [Education!]!
    certifications: [Certification!]!
    interests: [String!]!
    contact: [Contact!]!
  }

  type Stats {
    yearsExperience: Int!
    technologiesCount: Int!
    projectsDelivered: Int!
  }

  type HomeData {
    name: String!
    roles: [String!]!
    intro: [String!]!
    stats: Stats!
  }

  type Query {
    # Project queries
    projects: [Project!]!
    project(id: Int!): Project
    projectsByType(type: ProjectType!): [Project!]!
    
    # Profile/About queries
    profile: Profile
    
    # Home page queries
    homeData: HomeData
    
    # Utility queries
    allTechnologies: [String!]!
  }

  input ProjectInput {
    title: String!
    description: String!
    technologies: [String!]!
    Company: String
    demoLink: String
    githubLink: String
    type: ProjectType!
  }

  input ProfileInput {
    name: String!
    summary: [String!]!
    interests: [String!]!
  }

  type Mutation {
    # Project mutations
    createProject(input: ProjectInput!): Project!
    updateProject(id: Int!, input: ProjectInput!): Project
    deleteProject(id: Int!): Boolean!
    
    # Profile mutations
    updateProfile(input: ProfileInput!): Profile
  }
`;

export default typeDefs;
