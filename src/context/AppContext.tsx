import { createContext } from 'react';
import { IUseWordle } from '../hooks/useWordle';

export const AppContext = createContext<IUseWordle | null>(null);
