import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { IUseWordle } from '../hooks/useWordle';
import '../modal.scss';

export function EndGameModal(): JSX.Element {
  const { winIndicator, setWinIndicator, setRefMatrix, matrix, setActiveGame, setCurrentCell, setGuessedLetters, theWord } = useContext(
    AppContext
  ) as IUseWordle;

  const URL =
    'https://railway.app/project/9a207b90-af92-4d9a-b2df-4ae78cc09f2f/service/dd47e3c0-bfd0-4950-94bd-7ce54ceed504?id=d7b88584-38d4-4dc8-9d53-e9da3f6b1d81';
  const localURL = 'http://localhost/3001';

  function handleNewGame() {
    winIndicator && setWinIndicator(false);
    setRefMatrix(matrix);
    setCurrentCell({ curRow: 0, curCell: 0 });
    setGuessedLetters({ bull: [], cow: [], wrong: [] });
    setActiveGame(true);
    fetch(`${URL}/wordnum`)
      .then((response) => response.text())
      .then((wordNum) => localStorage.setItem('wordNum', wordNum))
      .catch((e) => console.log(e));
  }

  return (
    <div className="background">
      {winIndicator && (
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
        </div>
      )}
      <div className="textArea">
        {winIndicator ? <div>כל הכבוד!</div> : <div>לא נורא, ניסיון יפה!</div>}
        <div style={{ fontSize: '1rem' }}>
          המילה היא: <span>{theWord}</span>
        </div>
        <button type="button" onClick={handleNewGame}>
          משחק חדש
        </button>
      </div>
    </div>
  );
}
