# Portfolio Backend - GraphQL API

## Overview
This is a GraphQL API backend for the portfolio website built with:
- **Apollo Server** - GraphQL server
- **MongoDB** with **Mongoose** - Database and ODM
- **Node.js** with ES Modules - Runtime environment

## Project Structure
```
server/
├── models/          # Mongoose schemas
│   └── index.js     # Project, Profile, HomeData models
├── schema/          # GraphQL type definitions
│   └── typeDefs.js  # GraphQL schema
├── resolvers/       # GraphQL resolvers
│   └── index.js     # Query and Mutation resolvers
├── server.js        # Apollo Server setup
└── seed.js          # Database seeding script
```

## Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm/yarn

## Setup Instructions

### 1. Install MongoDB
#### Option A: Using Homebrew (macOS)
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Option B: Using Docker
```bash
docker run --name portfolio-mongo -p 27017:27017 -d mongo:latest
```

#### Option C: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create cluster and get connection string
3. Update `MONGODB_URI` in `.env`

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create `.env` file (already provided):
```
VITE_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=4000
HOST=localhost
```

### 4. Seed Database
```bash
npm run seed
```

### 5. Start Server
```bash
npm run server
```

### 6. Start Frontend + Backend Together
```bash
npm run full-dev
```

## Available Scripts
- `npm run server` - Start GraphQL server
- `npm run server:dev` - Start server with nodemon (auto-restart)
- `npm run seed` - Seed database with sample data
- `npm run full-dev` - Start both frontend and backend concurrently
- `npm run dev` - Start frontend only
- `npm run build` - Build frontend
- `npm run lint` - Lint code

## GraphQL Endpoints

### Server
- **GraphQL Playground**: http://localhost:4000/graphql
- **Health Check**: http://localhost:4000/ (when using Hapi)

### Sample Queries

#### Get All Projects
```graphql
query GetProjects {
  projects {
    id
    title
    description
    technologies
    Company
    type
  }
}
```

#### Get Profile Data
```graphql
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
    }
  }
}
```

#### Get Home Page Data
```graphql
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
```

## API Features
- ✅ **CRUD Operations** for projects
- ✅ **Profile/About** data management
- ✅ **Home page** data with dynamic stats
- ✅ **Technology filtering** and search
- ✅ **Type-safe** GraphQL schema
- ✅ **Error handling** with detailed messages
- ✅ **Database seeding** with sample data

## Frontend Integration
The React frontend uses Apollo Client to connect to this GraphQL API:
- Queries are defined in `src/graphql/queries.js`
- Apollo Client is configured in `src/apollo.js`
- Components use `useQuery` and `useMutation` hooks

## Troubleshooting

### MongoDB Connection Issues
1. Ensure MongoDB is running: `brew services list | grep mongodb`
2. Check connection string in `.env`
3. Verify database exists: `mongosh` then `show dbs`

### GraphQL Errors
1. Check server logs for detailed error messages
2. Use GraphQL Playground to test queries
3. Verify schema matches frontend queries

### CORS Issues
Server is configured to accept requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (CRA dev server)

## Next Steps
1. **Authentication**: Add JWT auth for admin features
2. **File Upload**: Image upload for projects/profile
3. **Cache**: Add Redis for query caching
4. **Deployment**: Deploy to Vercel/Netlify + MongoDB Atlas
5. **Tests**: Add unit/integration tests
6. **Monitoring**: Add logging and monitoring

## Tech Stack
- **Apollo Server 4** - GraphQL server
- **Mongoose 8** - MongoDB ODM
- **GraphQL** - Query language and runtime
- **Node.js** - JavaScript runtime
- **ES Modules** - Modern JavaScript modules
