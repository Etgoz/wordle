import { useState } from 'react';

export interface IUseAuth {
  userName: string;
  setUserName: Function;
}

export function useAuth(): IUseAuth {
  const [userName, setUserName] = useState(localStorage.getItem('userName') ?? '');

  return {
    userName,
    setUserName,
  };
}
