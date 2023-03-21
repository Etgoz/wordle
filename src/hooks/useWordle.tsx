import { useState, KeyboardEvent } from 'react';
import { SetStateAction, Dispatch } from 'react';

export interface ICurrentCellState {
  curRow: number;
  curCell: number;
}

export interface IRefMatrix {
  content: string;
  status: string;
  //status: empty / wrong / cow / bull
}

export interface IGussedLetters {
  bull: string[];
  cow: string[];
  wrong: string[];
}

export interface ICheckWord {
  winIndicator: boolean;
  statusArray: string[];
}

export interface IUseWordle {
  currentCell: ICurrentCellState;
  setCurrentCell: Dispatch<SetStateAction<ICurrentCellState>>;
  matrix: IRefMatrix[][];
  refMatrix: IRefMatrix[][];
  setRefMatrix: Dispatch<SetStateAction<IRefMatrix[][]>>;
  winIndicator: boolean;
  setWinIndicator: Dispatch<SetStateAction<boolean>>;
  setGuessedLetters: Dispatch<SetStateAction<IGussedLetters>>;
  activeGame: boolean;
  guessedLetters: IGussedLetters;
  FrontCheckWord: (userGuess: string, curRow: number, statusArray: string[]) => void;
  setActiveGame: Dispatch<SetStateAction<boolean>>;
  nextCell: (currentCell: ICurrentCellState) => void;
  prevCell: (currentCell: ICurrentCellState) => void;
  handleDelete: (currentCell: ICurrentCellState, refMatrix: Array<IRefMatrix[]>) => void;
  containsHeb: (str: string) => boolean;
  handleKeyDown: (ev: KeyboardEvent<HTMLDivElement>) => void;
  helpVisable: boolean;
  toggleHelpVisability: () => void;
  loginVisable: boolean;
  toggleLoginVisability: () => void;
  checkUserGuess: (key: string) => void;
  theWord: string;
  setTheWord: Dispatch<SetStateAction<string>>;
}

export function useWordle(): IUseWordle {
  const [currentCell, setCurrentCell] = useState<ICurrentCellState>({
    curRow: 0,
    curCell: 0,
  });

  const matrix = [
    [
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
    ],
    [
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
    ],
    [
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
    ],
    [
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
    ],
    [
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
    ],
    [
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
      { content: '', status: 'empty' },
    ],
  ];

  const [refMatrix, setRefMatrix] = useState<IRefMatrix[][]>(matrix);

  const [winIndicator, setWinIndicator] = useState<boolean>(false);

  const [activeGame, setActiveGame] = useState<boolean>(true);

  const [theWord, setTheWord] = useState<string>('');

  const [guessedLetters, setGuessedLetters] = useState<IGussedLetters>({
    bull: [],
    cow: [],
    wrong: [],
  });

  const [helpVisable, setHelpVisable] = useState(false);

  const URL = 'http://wordleserver-production.up.railway.app';
  const localURL = 'http://localhost/3001';

  function toggleHelpVisability() {
    loginVisable && toggleLoginVisability();
    setHelpVisable(!helpVisable);
  }

  const [loginVisable, setLoginVisable] = useState(false);

  function toggleLoginVisability() {
    helpVisable && toggleHelpVisability();
    setLoginVisable(!loginVisable);
  }

  function nextCell(currentCell: ICurrentCellState): void {
    const { curRow, curCell } = currentCell;
    let newCurRow = curRow;
    let newCurCell = curCell;
    if (curCell < 4) {
      newCurCell++;
    } else if (curCell === 4 && curRow < 5) {
      newCurCell = 0;
      newCurRow++;
    } else {
      return;
    }
    setCurrentCell({ curRow: newCurRow, curCell: newCurCell });
  }

  function prevCell(currentCell: ICurrentCellState): void {
    const { curRow, curCell } = currentCell;
    let newCurRow = curRow;
    let newCurCell = curCell;
    if (curCell > 0) {
      newCurCell--;
    } else if (curCell === 0 && curRow > 0) {
      newCurCell = 4;
      newCurRow--;
    } else {
      return;
    }
    setCurrentCell({ curRow: newCurRow, curCell: newCurCell });
  }

  function handleDelete(currentCell: ICurrentCellState, refMatrix: Array<IRefMatrix[]>): void {
    const { curRow, curCell } = currentCell;
    const newMatrix = [...refMatrix];

    newMatrix[curRow][curCell].content = '';
    setRefMatrix(newMatrix);
    if (curCell !== 0 && activeGame) {
      prevCell(currentCell);
    }
  }

  function containsHeb(str: string): boolean {
    return /[א-ת]/.test(str);
  }

  function switchFinalLetters(str: string): string {
    const char = str.substring(str.length - 1);
    let replaceLetter = '';
    if ('ךםןץף'.includes(char)) {
      switch (char) {
        case 'ך':
          replaceLetter = 'כ';
          break;
        case 'ם':
          replaceLetter = 'מ';
          break;
        case 'ן':
          replaceLetter = 'נ';
          break;
        case 'ף':
          replaceLetter = 'פ';
          break;
        case 'ץ':
          replaceLetter = 'צ';
          break;
      }

      const newStr = str.replace(char, replaceLetter);
      return newStr;
    }
    return str;
  }

  function FrontCheckWord(userGuess: string, curRow: number, statusArray: string[]): void {
    const newMatrix = [...refMatrix];
    const guessed = { ...guessedLetters };

    const userGuessNoFinals = switchFinalLetters(userGuess);

    statusArray.forEach((status, i) => {
      newMatrix[curRow][i].status = status;
      setRefMatrix(newMatrix);
      if (status === 'bull') {
        guessed.bull.push(userGuessNoFinals[i]);
      } else if (status === 'cow') {
        guessed.cow.push(userGuessNoFinals[i]);
      } else if (status === 'wrong') {
        guessed.wrong.push(userGuessNoFinals[i]);
      }
      setGuessedLetters(guessed);
    });
  }

  function checkUserGuess(key: string): void {
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
      console.log('checking user guess');
      let userGuess = '';
      for (let i = 0; i < 5; i++) {
        userGuess += refMatrix[curRow][i].content;
      }
      let statusArray: string[] = [];
      // checkWord(userGuess);
      //post request to /checkWord in the server, should contain userGuess: IRefMatrix[], curRow: number, guessedLetters: IGussedLetters
      const data = { userGuess, wordNum: localStorage.getItem('wordNum') };

      fetch(`${URL}/checkword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((responseData: ICheckWord) => {
          setWinIndicator(responseData.winIndicator);
          statusArray = responseData.statusArray;
          if (responseData.winIndicator) {
            fetch(`${URL}/theword/${localStorage.getItem('wordNum')}`)
              .then((response) => response.text())
              .then((word) => {
                setTheWord(word);
                setActiveGame(false);
              })
              .catch((e) => console.log(e));
          }
          FrontCheckWord(userGuess, curRow, statusArray);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      return;
    }
  }

  function handleKeyDown(ev: KeyboardEvent<HTMLDivElement>): void {
    if (helpVisable && ev.key === 'Escape') {
      setHelpVisable(false);
    }
    if (activeGame) {
      let key = ev.key;
      const { curRow, curCell } = currentCell;
      if (['Backspace', 'Delete', 'del'].includes(key)) {
        handleDelete(currentCell, refMatrix);
      } else if (containsHeb(key)) {
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

  return {
    currentCell,
    setCurrentCell,
    matrix,
    refMatrix,
    setRefMatrix,
    winIndicator,
    setWinIndicator,
    setGuessedLetters,
    activeGame,
    guessedLetters,
    FrontCheckWord,
    setActiveGame,
    nextCell,
    prevCell,
    handleDelete,
    containsHeb,
    handleKeyDown,
    helpVisable,
    toggleHelpVisability,
    loginVisable,
    toggleLoginVisability,
    checkUserGuess,
    theWord,
    setTheWord,
  };
}
