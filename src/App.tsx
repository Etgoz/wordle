import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { WordleApp } from './components/WordleApp';
import { AppContext } from './context/AppContext';
import { AuthContext } from './context/AuthContext';
import { IUseAuth, useAuth } from './hooks/useAuth';
import { IUseWordle, useWordle } from './hooks/useWordle';
import './wordle.scss';

function App(): JSX.Element {
  const wordleApi: IUseWordle = useWordle();
  const appAuth: IUseAuth = useAuth();
  const location = useLocation();
  const nevigate = useNavigate();

  // edit it to make the welcome page behave as needed
  useEffect(() => {
    if (location.pathname === '/') {
      // Redirect to the desired page
      !localStorage.getItem('welcomeLoaded') && nevigate('/welcome');
      localStorage.setItem('welcomeLoaded', 'true');
    }
  }, [location.pathname, nevigate]);

  return (
    <AuthContext.Provider value={appAuth}>
      <AppContext.Provider value={wordleApi}>
        <WordleApp />
      </AppContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
