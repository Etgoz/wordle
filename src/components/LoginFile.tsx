import React, { ChangeEvent, useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import '../modal.scss';

interface LoginFileProps {
  toggleLoginVisability?: Function;
}

export function LoginFile({ toggleLoginVisability }: LoginFileProps): JSX.Element {
  const { userName, setUserName } = useContext(AuthContext);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [userNameInputValue, setUserNameInputValue] = useState<string>('');

  function handleChange(ev: ChangeEvent<HTMLInputElement>) {
    setUserNameInputValue(ev.target.value);
  }

  function handleSubmit() {
    const curUserName = nameInputRef.current!.value;
    setUserName(curUserName);
    localStorage.setItem('userName', curUserName);
    console.log(curUserName, '\n', localStorage.getItem('userName'));
    toggleLoginVisability ? toggleLoginVisability() : navigate('/');
  }

  function handleCancel() {
    nameInputRef.current!.value = '';
    toggleLoginVisability ? toggleLoginVisability() : navigate('/');
  }

  return (
    <div className="background">
      <div className="textArea">
        <form className="loginForm">
          <div>
            <label htmlFor="nameInput">שם: </label>
            <input ref={nameInputRef} type="text" name="name" id="nameInput" onChange={handleChange} />
          </div>
          <div className="buttonsDiv">
            <button type="button" name="submit" onClick={handleSubmit} disabled={!userNameInputValue}>
              שלח
            </button>
            <button className="cancelButton" type="button" name="cancel" onClick={handleCancel}>
              {userName ? (location.pathname === '/welcome' ? 'למשחק' : 'ביטול') : 'שחק כאורח'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
