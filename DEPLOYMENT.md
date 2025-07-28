# GitHub Pages Deployment Guide

This document explains how to deploy your portfolio website to GitHub Pages.

## 🚀 Quick Setup

### Option 1: Automatic Deployment (Recommended)

1. **Push to main branch**
   ```bash
   git add .
   git commit -m "Add deployment configuration"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Set **Source** to "GitHub Actions"
   - The workflow will automatically run and deploy your site

3. **Access your site**
   - Your site will be available at: `https://hmandana.github.io/portfolio-next-react`
   - Initial deployment may take a few minutes

### Option 2: Manual Deployment

```bash
# Build and deploy manually
npm run deploy
```

## 📋 What's Configured

### Files Added/Modified:

1. **`.github/workflows/deploy.yml`** - GitHub Actions workflow
2. **`public/.nojekyll`** - Prevents Jekyll processing
3. **`public/404.html`** - Handles client-side routing
4. **`index.html`** - Added SPA routing support
5. **`vite.config.ts`** - Added base path for GitHub Pages
6. **`src/App.tsx`** - Added basename for React Router
7. **`package.json`** - Added deployment scripts

### Key Configuration:

- **Base Path**: `/portfolio-next-react/` for production
- **Build Output**: `dist/` directory
- **Client-side Routing**: Supported via 404.html redirect
- **Auto Deployment**: Triggers on push to main branch

## 🔧 Troubleshooting

### Common Issues:

1. **Site not loading**
   - Check if GitHub Pages is enabled in repository settings
   - Verify the workflow completed successfully in Actions tab

2. **Routes not working**
   - The 404.html file handles client-side routing
   - Make sure .nojekyll file is present

3. **Assets not loading**
   - Base path is configured in vite.config.ts
   - Should automatically use correct paths in production

### Manual Verification:

```bash
# Test local build
npm run build
npm run preview

# Check build output
ls -la dist/
```

## 🌐 Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to `public/` with your domain:
   ```
   yourdomain.com
   ```

2. Configure DNS with your domain provider:
   ```
   CNAME: www.yourdomain.com → hmandana.github.io
   ```

3. Update the homepage in `package.json`:
   ```json
   "homepage": "https://yourdomain.com"
   ```

## 📊 Monitoring

- **GitHub Actions**: Monitor deployment status in the Actions tab
- **Analytics**: Consider adding Google Analytics to track usage
- **Performance**: Use Lighthouse to monitor site performance

---

**Note**: The first deployment may take 5-10 minutes. Subsequent deployments are typically faster.

