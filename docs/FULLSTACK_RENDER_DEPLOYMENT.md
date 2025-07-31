# Fullstack Deployment to Render (UI + Backend + Database)

This guide will help you deploy your entire portfolio application to Render, including the frontend (React), backend (GraphQL), and database (PostgreSQL/MongoDB).

## 🏗️ Architecture Overview

Your fullstack deployment will consist of:
1. **Static Site** - React frontend (UI)
2. **Web Service** - Node.js GraphQL backend (API)
3. **Database** - Managed PostgreSQL or MongoDB

## 📋 Prerequisites

1. Render account ([render.com](https://render.com))
2. GitHub repository with your code
3. All changes committed and pushed

## 🚀 Deployment Steps

### Step 1: Prepare Your Repository

1. **Commit all changes:**
   ```bash
   git add .
   git commit -m "Configure fullstack deployment for Render"
   git push origin main
   ```

2. **Verify your `render.yaml` configuration** (already created):
   - Frontend: Static site serving from `dist/`
   - Backend: Web service running GraphQL server
   - Database: Managed database configuration

### Step 2: Deploy Using render.yaml (Recommended)

1. **Go to Render Dashboard**
2. **Click "New +" → "Blueprint"**
3. **Connect your GitHub repository**
4. **Select the repository and branch (`main`)**
5. **Render will automatically detect `render.yaml` and create all services**

### Step 3: Manual Deployment (Alternative)

If you prefer manual setup:

#### A. Create Database First
1. **New + → PostgreSQL** (or use existing MongoDB Atlas)
2. **Name**: `portfolio-database`
3. **Database Name**: `portfolio`
4. **User**: `portfoliouser`
5. **Region**: Oregon (US West)
6. **Plan**: Free
7. **Note the connection string**

#### B. Deploy Backend Service
1. **New + → Web Service**
2. **Connect GitHub repository**
3. **Configuration:**
   - **Name**: `portfolio-graphql-server`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm run server`
   - **Plan**: Free

4. **Environment Variables:**
   ```
   NODE_ENV=production
   MONGODB_URI=<your-database-connection-string>
   PORT=<auto-assigned-by-render>
   ```

#### C. Deploy Frontend Static Site
1. **New + → Static Site**
2. **Connect GitHub repository**
3. **Configuration:**
   - **Name**: `portfolio-ui`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: Free

4. **Environment Variables:**
   ```
   VITE_GRAPHQL_ENDPOINT=<your-backend-service-url>/graphql
   ```

### Step 4: Configure Environment Variables

After services are created, update these environment variables:

#### Backend Service Environment Variables:
```bash
NODE_ENV=production
MONGODB_URI=mongodb://portfoliouser:password@dpg-xxxxx-a.oregon-postgres.render.com/portfolio
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
```

#### Frontend Static Site Environment Variables:
```bash
VITE_GRAPHQL_ENDPOINT=https://portfolio-graphql-server.onrender.com/graphql
```

### Step 5: Database Setup

#### Option A: Use Render PostgreSQL
1. **Create PostgreSQL database** in Render
2. **Update your server code** to use PostgreSQL instead of MongoDB
3. **Install pg dependencies**: `npm install pg`

#### Option B: Use MongoDB Atlas (Recommended)
1. **Keep your existing MongoDB Atlas connection**
2. **Update MONGODB_URI** in backend service environment variables
3. **Ensure Atlas allows connections from Render's IP ranges**

### Step 6: Verify Deployment

1. **Check Backend Health:**
   - Visit: `https://portfolio-graphql-server.onrender.com/graphql`
   - Should show Apollo Server GraphQL playground

2. **Check Frontend:**
   - Visit: `https://portfolio-ui.onrender.com`
   - Should load your React application

3. **Test GraphQL Connection:**
   - Open browser dev tools on frontend
   - Check network tab for GraphQL requests
   - Verify data is loading from backend

## 🔧 Configuration Files Overview

### `render.yaml` (Infrastructure as Code)
```yaml
services:
  - type: web              # GraphQL Backend
    name: portfolio-graphql-server
    
  - type: static           # React Frontend
    name: portfolio-ui
    
databases:
  - name: portfolio-mongodb # Database
```

### Environment Variables Structure
```
Frontend (Static Site):
├── VITE_GRAPHQL_ENDPOINT

Backend (Web Service):
├── NODE_ENV
├── PORT (auto-assigned)
└── MONGODB_URI

Database:
├── Connection string provided by Render
```

## 🚨 Important Notes

### Free Tier Limitations:
- **Backend services sleep** after 15 minutes of inactivity
- **Cold start delay** of 30+ seconds after sleeping
- **750 hours/month** limit for web services
- **1GB storage** for databases

### Production Considerations:
- **Upgrade to paid plans** for production workloads
- **Set up custom domains** for better branding
- **Configure SSL certificates** (automatically provided)
- **Set up monitoring and alerts**

## 🔍 Troubleshooting

### Common Issues:

1. **Build Failures:**
   ```bash
   # Check build logs in Render dashboard
   # Common fixes:
   - Ensure all dependencies are in package.json
   - Check Node.js version compatibility
   - Verify build command is correct
   ```

2. **Database Connection Issues:**
   ```bash
   # Verify environment variables
   # Check database connection string format
   # Ensure database allows external connections
   ```

3. **CORS Issues:**
   ```bash
   # Backend server.js already configured for CORS
   # Verify frontend is calling correct GraphQL endpoint
   ```

4. **Frontend Not Loading Data:**
   ```bash
   # Check browser network tab
   # Verify VITE_GRAPHQL_ENDPOINT is correct
   # Ensure backend service is running
   ```

## 📊 Monitoring Your Deployment

1. **Render Dashboard**: Monitor service health, logs, and metrics
2. **GraphQL Playground**: Test API endpoints directly
3. **Browser Dev Tools**: Debug frontend issues
4. **Database Logs**: Monitor database performance

## 🔄 Updates and Redeploys

1. **Automatic Deploys**: Enabled by default on git push
2. **Manual Deploys**: Use Render dashboard "Deploy Latest Commit"
3. **Environment Changes**: Update in Render dashboard → Auto redeploy

Your fullstack application will be available at:
- **Frontend**: `https://portfolio-ui.onrender.com`
- **Backend**: `https://portfolio-graphql-server.onrender.com/graphql`
- **Database**: Managed connection string provided by Render
