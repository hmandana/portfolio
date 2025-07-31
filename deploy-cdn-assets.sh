#!/bin/bash

# Deploy CDN Assets to GitHub Script
echo "🚀 Deploying CDN assets to GitHub..."

# Add the cdn-assets folder to git
git add cdn-assets/

# Commit the changes
git commit -m "Add CDN assets for skill images

- Move skill images to cdn-assets/ for CDN delivery
- Enable jsDelivr CDN integration for production
- Fallback to local assets in development
- Improve loading performance with external CDN"

# Push to main branch
git push origin main

echo "✅ CDN assets deployed to GitHub!"
echo "📍 Assets will be available at:"
echo "   - GitHub Raw: https://raw.githubusercontent.com/hmandana/portfolio/main/cdn-assets/skills/"
echo "   - jsDelivr CDN: https://cdn.jsdelivr.net/gh/hmandana/portfolio@main/cdn-assets/skills/"
echo ""
echo "🔄 Note: jsDelivr CDN may take a few minutes to update after the first push."
echo "💡 For instant updates, use GitHub Raw URLs during development."
