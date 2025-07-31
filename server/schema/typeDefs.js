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

  type Profile {
    name: String!
    summary: [String!]!
    skills: [Skill!]!
    workExperience: [WorkExperience!]!
    education: [Education!]!
    certifications: [Certification!]!
    interests: [String!]!
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

  type ContactMessage {
    id: ID!
    name: String!
    email: String!
    phone: String
    message: String!
    isRead: Boolean!
    readAt: String
    createdAt: String!
    updatedAt: String!
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
    
    # Contact queries
    contactMessages: [ContactMessage!]!
    contactMessage(id: ID!): ContactMessage
    unreadContactMessages: [ContactMessage!]!
    
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

  input ContactMessageInput {
    name: String!
    email: String!
    phone: String
    message: String!
  }

  type ContactMessageResponse {
    success: Boolean!
    message: String!
  }

  type Mutation {
    # Project mutations
    createProject(input: ProjectInput!): Project!
    updateProject(id: Int!, input: ProjectInput!): Project
    deleteProject(id: Int!): Boolean!
    
    # Profile mutations
    updateProfile(input: ProfileInput!): Profile
    
    # Contact mutations
    sendContactMessage(input: ContactMessageInput!): ContactMessageResponse!
    markMessageAsRead(id: ID!): ContactMessage
    deleteContactMessage(id: ID!): Boolean!
  }
`;

export default typeDefs;
