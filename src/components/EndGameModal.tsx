import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { IUseWordle } from '../hooks/useWordle';
import '../modal.scss';

export function EndGameModal(): JSX.Element {
  const { winIndicator, setWinIndicator, setRefMatrix, matrix, setActiveGame, setCurrentCell, setGuessedLetters, theWord } = useContext(
    AppContext
  ) as IUseWordle;

  const URL = 'http://wordleserver-production.up.railway.app';
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
