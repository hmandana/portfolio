import { useContext } from 'react';
import DataFallbackContext, { type DataFallbackState } from '../contexts/DataFallbackContext';

export const useDataFallback = (): DataFallbackState => {
  const context = useContext(DataFallbackContext);
  if (!context) {
    throw new Error('useDataFallback must be used within a DataFallbackProvider');
  }
  return context;
};
