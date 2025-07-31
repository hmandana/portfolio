# 🚀 Fullstack Render Deployment Checklist

Use this checklist to ensure your deployment goes smoothly.

## ✅ Pre-Deployment Checklist

### 📋 Code Preparation
- [ ] All changes committed and pushed to `main` branch
- [ ] Environment files configured (`.env`, `.env.production`)
- [ ] `render.yaml` configuration verified
- [ ] Dependencies updated in `package.json`
- [ ] Build process tested locally (`npm run build`)

### 🔧 Environment Configuration
- [ ] Development environment variables set in `.env`
- [ ] Production environment variables prepared in `.env.production`
- [ ] MongoDB Atlas connection string ready (if using Atlas)
- [ ] GraphQL endpoint URLs configured correctly

### 🛠️ Server Configuration
- [ ] Server configured for production (CORS, port binding)
- [ ] Database connection tested
- [ ] GraphQL schema and resolvers working
- [ ] Health check endpoint accessible (`/graphql`)

## 🎯 Deployment Steps

### 1. Environment Validation
```bash
# Validate all environment configurations
npm run env:validate

# List current environment settings
npm run env:list
```

### 2. Local Build Test
```bash
# Test production build locally
npm run build:prod

# Preview the built application
npm run preview
```

### 3. Deploy to Render

#### Option A: Blueprint Deployment (Recommended)
- [ ] Go to Render Dashboard
- [ ] Click "New +" → "Blueprint"
- [ ] Connect GitHub repository
- [ ] Select `main` branch
- [ ] Let Render auto-detect `render.yaml`
- [ ] Click "Apply"

#### Option B: Manual Deployment
- [ ] Create database service first
- [ ] Deploy backend web service
- [ ] Deploy frontend static site
- [ ] Configure environment variables for each service

### 4. Post-Deployment Configuration
- [ ] Set `MONGODB_URI` in backend service environment
- [ ] Set `VITE_GRAPHQL_ENDPOINT` in frontend service environment
- [ ] Verify all services are running
- [ ] Test health endpoints

## 🔍 Verification Steps

### Backend Service
- [ ] Visit `https://your-backend-service.onrender.com/graphql`
- [ ] GraphQL playground loads successfully
- [ ] Test a sample query
- [ ] Check service logs for errors

### Frontend Service
- [ ] Visit `https://your-frontend-service.onrender.com`
- [ ] Application loads without errors
- [ ] GraphQL data loads correctly
- [ ] All pages and features work

### Database
- [ ] Backend connects to database successfully
- [ ] Data queries return expected results
- [ ] Database logs show successful connections

## 🚨 Common Issues & Solutions

### Build Failures
```bash
# Common fixes:
- Check Node.js version compatibility
- Verify all dependencies in package.json
- Review build logs in Render dashboard
- Ensure build command is correct
```

### Environment Variable Issues
```bash
# Check:
- Variable names are correct (VITE_ prefix for frontend)
- Values don't contain special characters
- Database connection strings are properly formatted
- Services are using correct environment variables
```

### Database Connection Problems
```bash
# Verify:
- MongoDB Atlas allows connections from 0.0.0.0/0 (or Render IPs)
- Connection string format is correct
- Database user permissions are sufficient
- Network access is configured properly
```

### CORS Issues
```bash
# Solutions already implemented:
- Server configured with csrfPrevention: false
- Apollo Server standalone server handles CORS
- Frontend and backend on same domain (Render)
```

## 📊 Monitoring & Maintenance

### Health Checks
- [ ] Set up health check endpoints
- [ ] Monitor service uptime
- [ ] Check resource usage (free tier limits)

### Performance
- [ ] Monitor cold start times (free tier sleeps after 15 min)
- [ ] Consider upgrading to paid plans for production
- [ ] Set up monitoring and alerts

### Updates
- [ ] Configure automatic deploys on git push
- [ ] Test staging environment before production
- [ ] Have rollback plan ready

## 🎉 Success Criteria

Your deployment is successful when:
- ✅ Frontend application loads and displays correctly
- ✅ GraphQL queries return data from the backend
- ✅ Database operations work (create, read, update, delete)
- ✅ All services show "Healthy" status in Render dashboard
- ✅ No critical errors in service logs

## 📞 Support Resources

- **Render Documentation**: [render.com/docs](https://render.com/docs)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **Apollo Server**: [apollographql.com/docs](https://www.apollographql.com/docs)
- **Render Discord**: Join for community support
- **Project Documentation**: Check `/docs` folder for specific guides

---

**🔄 Remember**: Free tier services sleep after 15 minutes of inactivity. First request after sleeping may take 30+ seconds. Consider upgrading to paid plans for production workloads.
