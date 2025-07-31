// CDN Configuration for different environments
export const CDN_CONFIG = {
  // Option 1: GitHub CDN (Free, good for portfolios)
  github: {
    baseUrl: 'https://raw.githubusercontent.com/hmandana/portfolio/main/cdn-assets',
    skillsPath: '/skills',
    // Usage: https://raw.githubusercontent.com/hmandana/portfolio/main/cdn-assets/skills/javascript.png
  },
  
  // Option 2: jsDelivr CDN (Free, faster, with caching)
  jsdelivr: {
    baseUrl: 'https://cdn.jsdelivr.net/gh/hmandana/portfolio@main/cdn-assets',
    skillsPath: '/skills',
    // Usage: https://cdn.jsdelivr.net/gh/hmandana/portfolio@main/cdn-assets/skills/javascript.png
  },
  
  // Option 3: Cloudinary (Free tier, image optimization)
  cloudinary: {
    baseUrl: 'https://res.cloudinary.com/your-cloud-name/image/upload',
    skillsPath: '/v1234567890/skills', // version folder
    // Usage: https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/skills/javascript.png
  },
  
  // Option 4: Netlify/Vercel (if deploying there)
  netlify: {
    baseUrl: 'https://your-site.netlify.app/assets',
    skillsPath: '/skills',
  }
};

// Environment-based CDN selection
const getEnvironmentCDN = () => {
  if (import.meta.env.PROD) {
    // Production: Use jsDelivr for better performance
    return CDN_CONFIG.jsdelivr;
  } else {
    // Development: Use local assets
    return { baseUrl: '', skillsPath: '/assets/skills' };
  }
};

export const ACTIVE_CDN = getEnvironmentCDN();

// Helper function to generate skill image URLs
export const getSkillImageUrl = (imagePath: string): string => {
  // If imagePath is already a full URL, return as-is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If it's a local path like "/assets/skills/javascript.png"
  if (imagePath.startsWith('/assets/skills/')) {
    const filename = imagePath.replace('/assets/skills/', '');
    return `${ACTIVE_CDN.baseUrl}${ACTIVE_CDN.skillsPath}/${filename}`;
  }
  
  // Default fallback
  return `${ACTIVE_CDN.baseUrl}${ACTIVE_CDN.skillsPath}/${imagePath}`;
};

// Fallback images
export const FALLBACK_IMAGES = {
  placeholder: 'https://via.placeholder.com/32x32/4F46E5/FFFFFF?text=?',
  error: 'https://via.placeholder.com/32x32/EF4444/FFFFFF?text=!',
};
