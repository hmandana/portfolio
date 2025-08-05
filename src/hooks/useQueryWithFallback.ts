import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, ApolloError } from '@apollo/client';
import type { DocumentNode } from '@apollo/client';
import { useDataFallback } from '../contexts/DataFallbackContext';

interface UseQueryWithFallbackOptions {
  query: DocumentNode;
  variables?: Record<string, unknown>;
  fallbackDataKey: 'homeData' | 'profile' | 'projects';
  pollInterval?: number;
  notifyOnNetworkStatusChange?: boolean;
}

interface UseQueryWithFallbackResult<T> {
  data: T | null;
  loading: boolean;
  error: ApolloError | null;
  refetch: () => void;
  networkStatus: number;
  isUsingFallback: boolean;
  retryWithGraphQL: () => void;
}

export function useQueryWithFallback<T = unknown>({
  query,
  variables,
  fallbackDataKey,
  pollInterval,
  notifyOnNetworkStatusChange = true
}: UseQueryWithFallbackOptions): UseQueryWithFallbackResult<T> {
  
  const { staticData, isOnline, loadStaticData } = useDataFallback();
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [fallbackData, setFallbackData] = useState<T | null>(null);

  // Apollo GraphQL query
  const {
    data: graphqlData,
    loading: graphqlLoading,
    error: graphqlError,
    refetch,
    networkStatus
  } = useQuery(query, {
    variables,
    pollInterval: isOnline ? pollInterval : undefined, // Don't poll when offline
    notifyOnNetworkStatusChange,
    errorPolicy: 'all', // Continue even with errors
    fetchPolicy: 'cache-first', // Use cache when available
    onError: (error) => {
      console.warn('🚨 GraphQL Error detected:', error.message);
      handleGraphQLError(error);
    }
  });

  // Handle GraphQL errors by switching to fallback data
  const handleGraphQLError = useCallback(async (error: ApolloError) => {
    console.log('🔄 Switching to fallback data due to GraphQL error...');
    
    // Check if it's a network error (server down, no internet, etc.)
    const isNetworkError = error.networkError || 
                          error.message.includes('fetch') || 
                          error.message.includes('Network') ||
                          error.message.includes('Failed to fetch');

    if (isNetworkError || !isOnline) {
      console.log('🌐 Network issue detected, loading static data...');
      await loadStaticData();
      setIsUsingFallback(true);
    } else {
      // For GraphQL errors (not network), still try fallback if no data
      if (!graphqlData && staticData[fallbackDataKey]) {
        console.log('📊 Using cached static data for GraphQL error...');
        setIsUsingFallback(true);
      }
    }
  }, [isOnline, loadStaticData, graphqlData, staticData, fallbackDataKey]);

  // Transform static data to match GraphQL response structure
  const transformStaticData = useCallback((data: unknown, key: string): T => {
    switch (key) {
      case 'homeData':
        return { homeData: data } as T;
      case 'profile':
        return { profile: data } as T;
      case 'projects':
        return { projects: Array.isArray(data) ? data : (data as Record<string, unknown>)?.projects || [] } as T;
      default:
        return data as T;
    }
  }, []);

  // Update fallback data when static data changes
  useEffect(() => {
    if (staticData[fallbackDataKey]) {
      // Transform static data to match GraphQL response structure
      const transformedData = transformStaticData(staticData[fallbackDataKey], fallbackDataKey);
      setFallbackData(transformedData);
    }
  }, [staticData, fallbackDataKey, transformStaticData]);

  // Auto-retry GraphQL when back online
  useEffect(() => {
    if (isOnline && isUsingFallback && !graphqlLoading) {
      console.log('🔄 Back online, attempting to refetch GraphQL data...');
      setTimeout(() => {
        refetch().then(() => {
          console.log('✅ GraphQL data refetched successfully');
          setIsUsingFallback(false);
        }).catch((error) => {
          console.warn('⚠️ GraphQL refetch failed, staying with fallback data:', error);
        });
      }, 1000); // Small delay to ensure connection is stable
    }
  }, [isOnline, isUsingFallback, refetch, graphqlLoading]);

  // Manual retry function
  const retryWithGraphQL = async () => {
    if (isOnline) {
      console.log('🔄 Manual GraphQL retry requested...');
      try {
        await refetch();
        setIsUsingFallback(false);
        console.log('✅ GraphQL retry successful');
      } catch (error) {
        console.warn('⚠️ GraphQL retry failed:', error);
      }
    } else {
      console.log('📴 Cannot retry GraphQL while offline');
    }
  };

  // Determine what data to return
  const finalData = isUsingFallback ? fallbackData : graphqlData;
  const finalError = isUsingFallback ? null : (graphqlError || null);

  // Show loading state only if GraphQL is loading AND we don't have fallback data
  const showLoading = graphqlLoading && !fallbackData;

  return {
    data: finalData,
    loading: showLoading,
    error: finalError,
    refetch: retryWithGraphQL,
    networkStatus,
    isUsingFallback,
    retryWithGraphQL
  };
}

// Enhanced error boundaries for GraphQL errors
interface ErrorFallbackProps {
  error: Error;
}

interface GraphQLErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
}

interface GraphQLErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class GraphQLErrorBoundary extends React.Component<GraphQLErrorBoundaryProps, GraphQLErrorBoundaryState> {
  constructor(props: GraphQLErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): GraphQLErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🚨 GraphQL Error Boundary caught an error:', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return React.createElement(FallbackComponent, { error: this.state.error });
    }

    return this.props.children;
  }
}

// Default error fallback component
const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  return React.createElement('div', 
    { className: 'flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900' },
    React.createElement('div',
      { className: 'text-center p-8' },
      React.createElement('div', { className: 'text-red-500 text-6xl mb-4' }, '⚠️'),
      React.createElement('h2', 
        { className: 'text-xl font-semibold text-gray-800 dark:text-white mb-2' },
        'Something went wrong'
      ),
      React.createElement('p',
        { className: 'text-gray-600 dark:text-gray-400 mb-4' },
        "We're loading your data from our backup systems"
      ),
      React.createElement('p',
        { className: 'text-sm text-gray-500 mb-4' },
        error.message
      ),
      React.createElement('button',
        {
          onClick: () => window.location.reload(),
          className: 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
        },
        'Reload Page'
      )
    )
  );
};

export default useQueryWithFallback;
