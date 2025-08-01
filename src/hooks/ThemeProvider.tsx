import { useState, useEffect, useCallback } from 'react';
import { ThemeContext } from './ThemeContext';

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

/**
 * ThemeProvider is a context provider component that manages and applies
 * the application's theme (dark or light mode) based on user preference
 * or system settings. It saves the theme to local storage for persistence
 * across sessions and listens for system theme changes to automatically
 * update the UI. It provides the current theme state and functions to
 * toggle or set the theme directly to all its child components via
 * ThemeContext.
 * 
 * Props:
 * - children: ReactNode - The child components that will have access
 *   to the theme context.
 */

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      // Check for saved theme in local storage
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
    } catch (error) {
      console.warn('localStorage not available:', error);
    }
    
    // Fallback to system preference
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (error) {
      console.warn('matchMedia not available:', error);
      return false; // Default to light mode
    }
  });

  // Apply theme class to document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      try {
        localStorage.setItem('theme', 'dark');
      } catch (error) {
        console.warn('Unable to save theme to localStorage:', error);
      }
    } else {
      root.classList.remove('dark');
      try {
        localStorage.setItem('theme', 'light');
      } catch (error) {
        console.warn('Unable to save theme to localStorage:', error);
      }
    }
  }, [isDarkMode]);

  // Only listen for system theme changes if no saved preference exists
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
          setIsDarkMode(e.matches);
        };
        
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }
    } catch (error) {
      console.warn('Unable to set up system theme listener:', error);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const setTheme = useCallback((theme: 'light' | 'dark') => {
    setIsDarkMode(theme === 'dark');
  }, []);

  const value = { isDarkMode, toggleTheme, setTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};


