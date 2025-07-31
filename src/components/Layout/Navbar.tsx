import { Link, useLocation } from 'react-router-dom';
import React from 'react';

  /**
   * Renders the main navigation bar.
   * 
   * The navigation bar is a horizontal bar at the top of the page which contains links to the main pages of the website.
   * The bar is styled with Tailwind CSS and is responsive, so it shrinks on smaller screens.
   * The links are styled based on whether they are active or not.
   * 
   * @returns The navigation bar component.
   */
const Navbar: React.FC = () => {
  const location = useLocation();
  
  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-cyan-400 dark:text-cyan-300' : 'text-gray-600 dark:text-gray-300';
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white transition-colors duration-300">
              My Portfolio
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300 ${isActive('/')}`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`px-3 py-2 rounded-md text-sm font-medium hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300 ${isActive('/about')}`}
              >
                About
              </Link>
              <Link 
                to="/projects" 
                className={`px-3 py-2 rounded-md text-sm font-medium hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300 ${isActive('/projects')}`}
              >
                Projects
              </Link>
              <Link 
                to="/contact" 
                className={`px-3 py-2 rounded-md text-sm font-medium hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-300 ${isActive('/contact')}`}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

