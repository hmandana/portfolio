import { createContext } from 'react';
import type { ThemeContextType } from './ThemeProvider';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

