import React, { useState, useEffect } from 'react';
import { useData } from '../../contexts/DataContext';

const DataStatusIndicator: React.FC = () => {
  const { dataSource, isUsingGraphQL, projectsError, profileError, homeDataError } = useData();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Check if any data is using backup/fallback
  const isUsingBackup = dataSource === 'backup-static' || dataSource === 'static' || 
    projectsError?.includes('backup') || profileError?.includes('backup') || homeDataError?.includes('backup');

  // Show indicator when using backup data
  useEffect(() => {
    if (isUsingBackup && !isDismissed) {
      setIsVisible(true);
      
      // Auto-hide after 10 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [isUsingBackup, isDismissed]);

  // Don't render if not using backup or user dismissed
  if (!isVisible || isDismissed) {
    return null;
  }

  const getStatusInfo = () => {
    if (dataSource === 'backup-static') {
      return {
        icon: '⚠️',
        title: 'Using Backup Data',
        message: 'DataProvider not available - displaying sample content',
        bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
        borderColor: 'border-yellow-200 dark:border-yellow-800',
        textColor: 'text-yellow-800 dark:text-yellow-200'
      };
    } else if (dataSource === 'static' || !isUsingGraphQL) {
      return {
        icon: '📦',
        title: 'Offline Mode',
        message: 'Using cached data - some features may be limited',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        borderColor: 'border-blue-200 dark:border-blue-800',
        textColor: 'text-blue-800 dark:text-blue-200'
      };
    }
    
    return {
      icon: '🔄',
      title: 'Fallback Mode',
      message: 'Primary data source unavailable',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      textColor: 'text-orange-800 dark:text-orange-200'
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className={`${statusInfo.bgColor} ${statusInfo.borderColor} border rounded-lg p-4 shadow-lg transition-all duration-300 transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-lg" role="img" aria-label="Status icon">
              {statusInfo.icon}
            </span>
          </div>
          
          <div className="ml-3 flex-1">
            <h3 className={`text-sm font-medium ${statusInfo.textColor}`}>
              {statusInfo.title}
            </h3>
            <p className={`text-xs mt-1 ${statusInfo.textColor} opacity-75`}>
              {statusInfo.message}
            </p>
            
            {dataSource === 'backup-static' && (
              <div className="mt-2">
                <button
                  onClick={() => window.location.reload()}
                  className="text-xs underline hover:no-underline opacity-75 hover:opacity-100"
                >
                  Try refreshing the page
                </button>
              </div>
            )}
          </div>
          
          <button
            onClick={() => {
              setIsDismissed(true);
              setIsVisible(false);
            }}
            className={`ml-2 ${statusInfo.textColor} opacity-50 hover:opacity-100`}
            aria-label="Dismiss notification"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataStatusIndicator;
