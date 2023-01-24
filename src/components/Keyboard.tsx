import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { IUseWordle } from '../hooks/useWordle';
import { KeyboardRow } from './KeyboardRow';

export function Keyboard(): JSX.Element {
  const { currentCell, refMatrix, handleDelete } = useContext(AppContext) as IUseWordle;

  const firstLineLetters = ['פ', 'ו', 'ט', 'א', 'ר', 'ק'];
  const secondLineLetters = ['ל', 'ח', 'י', 'ע', 'כ', 'ג', 'ד', 'ש'];
  const thirdLineLetters = ['ת', 'צ', 'מ', 'נ', 'ה', 'ב', 'ס', 'ז'];

  return (
    <>
      <div className="keyboard">
        {/* <button type="button" id="submit">
						שלח
					</button> */}
        <button onClick={() => handleDelete(currentCell, refMatrix)} type="button" id="del">
          del
        </button>
        <KeyboardRow letters={firstLineLetters} />
      </div>
      <KeyboardRow letters={secondLineLetters} />
      <KeyboardRow letters={thirdLineLetters} />
    </>
  );
}
