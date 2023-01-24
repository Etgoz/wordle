import { createContext } from 'react';
import { IUseAuth } from '../hooks/useAuth';

export const AuthContext = createContext<IUseAuth | null>(null);
