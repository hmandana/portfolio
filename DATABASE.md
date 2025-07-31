# Database Management

This portfolio application uses MongoDB Atlas as the primary data source. All data is managed directly in MongoDB without local JSON files or seeding.

## 🗄️ Database Structure

The application uses three main collections:

### 1. **Projects Collection** (`projects`)
- Stores portfolio projects with details like title, description, technologies, demo links
- Supports both professional and personal project types
- Auto-incrementing ID system

### 2. **Profile Collection** (`profiles`)
- Contains personal information, skills, work experience, education
- Stores contact information and professional summary
- Skills include both name and image references for CDN assets

### 3. **Home Data Collection** (`homedatas`)
- Homepage content including name, roles, introduction text
- Statistics like years of experience, technologies count, projects delivered
- Dynamic content for the landing page

## 🚀 Getting Started

### Prerequisites
1. MongoDB Atlas account and cluster set up
2. Environment variables configured in `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/Portfolio?retryWrites=true&w=majority
   ```

### Initial Setup

1. **Test your connection:**
   ```bash
   npm run test:connection
   ```

2. **Check database status:**
   ```bash
   npm run db:status
   ```

3. **Initialize basic data structure (if empty):**
   ```bash
   npm run db:init
   ```

## 📋 Available Database Commands

| Command | Description |
|---------|-------------|
| `npm run db:status` | Check current database status and document counts |
| `npm run db:init` | Create initial profile and home data structures |
| `npm run db:clear` | ⚠️ **DANGER**: Delete ALL data from database |
| `npm run test:connection` | Test MongoDB Atlas connection |

## 🔧 Managing Your Data

### Adding Projects
Use the GraphQL mutations through your application or GraphQL playground:

```graphql
mutation CreateProject($input: ProjectInput!) {
  createProject(input: $input) {
    id
    title
    description
    technologies
    type
  }
}
```

### Updating Profile
```graphql
mutation UpdateProfile($input: ProfileInput!) {
  updateProfile(input: $input) {
    name
    summary
    skills {
      name
      image
    }
  }
}
```

### Direct Database Access
You can also manage data directly through:
- MongoDB Atlas Dashboard
- MongoDB Compass
- Any MongoDB client

## 🌐 CDN Assets

Skill images are served from CDN:
- **Development**: Local assets (`/assets/skills/`)
- **Production**: jsDelivr CDN (`https://cdn.jsdelivr.net/gh/username/repo@main/cdn-assets/skills/`)

## 🔍 Querying Data

All data queries go through GraphQL resolvers:

```graphql
# Get all projects
query GetProjects {
  projects {
    id
    title
    description
    technologies
    type
  }
}

# Get profile information
query GetProfile {
  profile {
    name
    summary
    skills {
      name
      image
    }
  }
}

# Get home page data
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

## 🛡️ Data Safety

- **No local seeding**: All data lives in MongoDB Atlas
- **Backup recommended**: Use MongoDB Atlas backup features
- **Environment variables**: Keep your MongoDB URI secure
- **Connection testing**: Use `npm run test:connection` to verify connectivity

## 🔄 Migration from Local Data

If you had local JSON data previously:
1. Export your data from the local files
2. Insert data directly into MongoDB using the GraphQL mutations
3. Or use MongoDB import tools to bulk insert data

## 📊 Production Considerations

- **Connection pooling**: Handled automatically by Mongoose
- **Error handling**: All GraphQL resolvers include error handling
- **Performance**: Queries are optimized with proper indexing
- **Caching**: Consider implementing Redis for high-traffic scenarios

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection timeouts | Check MongoDB Atlas network access whitelist |
| Authentication errors | Verify username/password in connection string |
| Missing data | Run `npm run db:init` to create initial structure |
| GraphQL errors | Check server logs and MongoDB Atlas monitoring |

---

**Note**: This application no longer uses local JSON files or seeding scripts. All data management happens through MongoDB Atlas and GraphQL operations.
