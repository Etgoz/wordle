import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { AuthContext } from '../context/AuthContext';
import { IUseAuth } from '../hooks/useAuth';
import { IUseWordle } from '../hooks/useWordle';

export function Header(): JSX.Element {
  const { toggleHelpVisability, toggleLoginVisability } = useContext(AppContext) as IUseWordle;
  const { userName, setUserName } = useContext(AuthContext) as IUseAuth;

  function handleLogOut() {
    setUserName('');
    localStorage.removeItem('userName');
    console.log('logout\n', userName, '\n', localStorage.getItem('userName'));
  }

  return (
    <header>
      <div className="userArea">
        {userName ? (
          <button type="button" onClick={handleLogOut}>
            log out
          </button>
        ) : (
          <button type="button" onClick={toggleLoginVisability}>
            log in
          </button>
        )}
        {userName ? <span>שלום {userName}!</span> : <span>שלום אורח/ת!</span>}
      </div>
      <h1>וורדל!</h1>
      <button type="button" id="helpButton" onClick={toggleHelpVisability}>
        ?
      </button>
    </header>
  );
}
