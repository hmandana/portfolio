# Deploying GraphQL Server to Render

## Step 1: Prepare Your Repository
1. Commit and push all the changes to your GitHub repository
2. Make sure the `render.yaml` file is in your root directory

## Step 2: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up/Sign in with your GitHub account

## Step 3: Deploy the Service
1. Click "New +" and select "Web Service"
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: `portfolio-graphql-server` (or your preferred name)
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm run server`

## Step 4: Set Environment Variables
In the Render dashboard, add these environment variables:
- `NODE_ENV`: `production`
- `MONGODB_URI`: Your MongoDB connection string (copy from your .env file)

## Step 5: Deploy
1. Click "Create Web Service"
2. Wait for the deployment to complete (5-10 minutes)
3. Your GraphQL server will be available at: `https://your-service-name.onrender.com/graphql`

## Step 6: Update Frontend Configuration
1. Copy your Render URL (e.g., `https://portfolio-graphql-server.onrender.com/graphql`)
2. Update `.env.production` with your actual URL
3. Add the URL as a GitHub secret:
   - Go to your GitHub repo → Settings → Secrets and variables → Actions
   - Add new secret: `VITE_GRAPHQL_ENDPOINT` = `https://your-service-name.onrender.com/graphql`

## Step 7: Test Your Deployment
1. Visit your Render URL in the browser
2. You should see the Apollo Server GraphQL playground
3. Test a query to make sure everything works

## Important Notes
- Free tier services on Render may sleep after 15 minutes of inactivity
- The first request after sleeping may take 30+ seconds to respond
- Consider upgrading to a paid plan for production use

## Troubleshooting
- Check Render logs if deployment fails
- Ensure all environment variables are set correctly
- Make sure your MongoDB connection string is accessible from Render's servers
