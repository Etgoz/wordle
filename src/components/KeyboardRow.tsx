import React, { useContext, MouseEvent } from 'react';
import { AppContext } from '../context/AppContext';
import { IUseWordle } from '../hooks/useWordle';

export interface IKeyboardRow {
  letters: string[];
}

export function KeyboardRow({ letters }: IKeyboardRow): JSX.Element {
  const { guessedLetters, activeGame, checkUserGuess, currentCell, refMatrix, setRefMatrix, nextCell, winIndicator, setActiveGame, setTheWord } = useContext(
    AppContext
  ) as IUseWordle;

  const URL =
    'https://railway.app/project/9a207b90-af92-4d9a-b2df-4ae78cc09f2f/service/dd47e3c0-bfd0-4950-94bd-7ce54ceed504?id=d7b88584-38d4-4dc8-9d53-e9da3f6b1d81';
  const localURL = 'http://localhost/3001';

  function handleVirtualKeyboardClick(ev: MouseEvent<HTMLButtonElement>) {
    if (activeGame) {
      let key = (ev.target as HTMLElement).innerText;
      const { curRow, curCell } = currentCell;
      if (curCell === 4 && 'כמנצפ'.includes(key)) {
        switch (key) {
          case 'כ':
            key = 'ך';
            break;
          case 'מ':
            key = 'ם';
            break;
          case 'נ':
            key = 'ן';
            break;
          case 'פ':
            key = 'ף';
            break;
          case 'צ':
            key = 'ץ';
            break;
        }
      }
      const newMatrix = [...refMatrix];
      newMatrix[curRow][curCell].content = key;
      setRefMatrix(newMatrix);
      nextCell(currentCell);
      if (curCell === 4) {
        checkUserGuess(key);
      }
      if ((curRow === 5 && curCell === 4) || winIndicator) {
        fetch(`${URL}/theword/${localStorage.getItem('wordNum')}`)
          .then((response) => response.text())
          .then((word) => {
            setTheWord(word);
            setActiveGame(false);
          })
          .catch((e) => console.log(e));
      }
    }
  }

  function letterClass(letter: string): string {
    if (guessedLetters.bull.includes(letter)) {
      return 'bull';
    } else if (guessedLetters.cow.includes(letter)) {
      return 'cow';
    } else if (guessedLetters.wrong.includes(letter)) {
      return 'wrong';
    } else {
      return '';
    }
  }

  return (
    <div className="keyboard">
      {letters.map((letter) => {
        return (
          <button onClick={handleVirtualKeyboardClick} type="button" key={letter} className={letterClass(letter)}>
            {letter}
          </button>
        );
      })}
    </div>
  );
}
