import { useState, Dispatch } from 'react';

export interface IUseAuth {
  userName: string;
  setUserName: Dispatch<React.SetStateAction<string>>;
}

export function useAuth(): IUseAuth {
  const [userName, setUserName] = useState(localStorage.getItem('userName') ?? '');

  return {
    userName,
    setUserName,
  };
}
