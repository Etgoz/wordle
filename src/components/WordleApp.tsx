import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { InputGrid } from './InputGrid';
import { Keyboard } from './Keyboard';
import { Header } from './Header';
import { HelpModal } from './HelpModal';
import { LoginFile } from './LoginFile';
import { EndGameModal } from './EndGameModal';
import { IUseWordle } from '../hooks/useWordle';
import { useEffect } from 'react';

export function WordleApp(): JSX.Element {
  const { handleKeyDown, helpVisable, loginVisable, activeGame, toggleLoginVisability } = useContext(AppContext) as IUseWordle;

  const URL =
    'https://railway.app/project/9a207b90-af92-4d9a-b2df-4ae78cc09f2f/service/dd47e3c0-bfd0-4950-94bd-7ce54ceed504?id=d7b88584-38d4-4dc8-9d53-e9da3f6b1d81';
  const localURL = 'http://localhost/3001';

  useEffect(() => {
    fetch(`${URL}/wordnum`)
      .then((response) => response.text())
      .then((wordNum) => localStorage.setItem('wordNum', wordNum))
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <div onKeyDown={handleKeyDown}>
        <Header />
        <section className="input-zone">
          <InputGrid />
        </section>
        <section className="keyboard-zone">
          <Keyboard />
        </section>
      </div>
      {helpVisable && <HelpModal />}
      {loginVisable && <LoginFile toggleLoginVisability={toggleLoginVisability} />}
      {!activeGame && <EndGameModal />}
    </>
  );
}
