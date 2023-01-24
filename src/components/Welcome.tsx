import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { AuthContext } from '../context/AuthContext';
import { LoginFile } from './LoginFile';
import '../wordle.scss';

export function Welcome(): JSX.Element {
  const appAuth = useAuth();
  const curUserName = localStorage.getItem('userName');

  return (
    <AuthContext.Provider value={appAuth}>
      <header>
        <h1 className="welcome" style={{ gridColumn: 2 }}>
          Welcome {curUserName ? curUserName : 'User'}
        </h1>
      </header>
      <LoginFile />
    </AuthContext.Provider>
  );
}
