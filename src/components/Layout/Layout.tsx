import React from 'react';
import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      
      {/* Main content with proper spacing for sticky header and footer */}
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 pb-24">
        {children}
      </main>
      
      {/* Sticky Footer */}
      <div className="sticky bottom-0 z-50 mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

