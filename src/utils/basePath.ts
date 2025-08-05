/**
 * Get the correct base path for assets in both development and production
 * In development: '' (root)
 * In production (GitHub Pages): '/portfolio/'
 */
export const getBasePath = (): string => {
  if (import.meta.env.DEV) {
    return '';
  }
  
  // For GitHub Pages deployment
  return '/portfolio';
};

/**
 * Get the full path for a data file with correct base path
 */
export const getDataPath = (filename: string): string => {
  return `${getBasePath()}/data/${filename}`;
};
