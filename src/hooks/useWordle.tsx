import { useState, KeyboardEvent } from "react";

interface currentCellState {
	curRow: number;
	curCell: number;
}

interface IRefMatrix {
	content: string;
	status: string;
	//status: empty / wrong / cow / bull
}

interface IGussedLetters {
	bull: string[];
	cow: string[];
	wrong: string[];
}

export interface IUseWordle {
	currentCell: currentCellState;
	setCurrentCell: Function;
	matrix: Object[];
	refMatrix: IRefMatrix[][];
	setRefMatrix: Function;
	winIndicator: boolean;
	setWinIndicator: Function;
	setGuessedLetters: Function;
	activeGame: boolean;
	guessedLetters: IGussedLetters;
	setActiveGame: Function;
	nextCell: Function;
	prevCell: Function;
	handleDelete: Function;
	containsHeb: Function;
	handleKeyDown: Function;
	checkWord: Function;
	helpVisable: boolean;
	toggleHelpVisability: Function;
	loginVisable: boolean;
	toggleLoginVisability: Function;
	theWord: string;
}

export function useWordle(): IUseWordle {
	const [currentCell, setCurrentCell] = useState<currentCellState>({
		curRow: 0,
		curCell: 0,
	});

	const matrix = [
		[
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
		],
		[
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
		],
		[
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
		],
		[
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
		],
		[
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
		],
		[
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
			{ content: "", status: "empty" },
		],
	];

	const [refMatrix, setRefMatrix] = useState<IRefMatrix[][]>(matrix);

	const [winIndicator, setWinIndicator] = useState<boolean>(false);

	const [activeGame, setActiveGame] = useState<boolean>(true);

	const [guessedLetters, setGuessedLetters] = useState<IGussedLetters>({
		bull: [],
		cow: [],
		wrong: [],
	});

	const [helpVisable, setHelpVisable] = useState(false);

	function toggleHelpVisability() {
		loginVisable && toggleLoginVisability();
		setHelpVisable(!helpVisable);
	}

	const [loginVisable, setLoginVisable] = useState(false);

	function toggleLoginVisability() {
		helpVisable && toggleHelpVisability();
		setLoginVisable(!loginVisable);
	}

	const theWord = "אלבום";

	function nextCell(currentCell: currentCellState): void {
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

	function prevCell(currentCell: currentCellState): void {
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

	function handleDelete(
		currentCell: currentCellState,
		refMatrix: Array<IRefMatrix[]>
	) {
		const { curRow, curCell } = currentCell;
		const newMatrix = [...refMatrix];

		newMatrix[curRow][curCell].content = "";
		setRefMatrix(newMatrix);
		if (curCell !== 0 && activeGame) {
			prevCell(currentCell);
		}
	}

	function containsHeb(str: string): boolean {
		return /[א-ת]/.test(str);
	}

	function switchFinalLetters(str: string): string {
		let char = str.substring(str.length - 1);
		let replaceLetter = "";
		if ("ךםןץף".includes(char)) {
			switch (char) {
				case "ך":
					replaceLetter = "כ";
					break;
				case "ם":
					replaceLetter = "מ";
					break;
				case "ן":
					replaceLetter = "נ";
					break;
				case "ף":
					replaceLetter = "פ";
					break;
				case "ץ":
					replaceLetter = "צ";
					break;
			}

			const newStr = str.replace(char, replaceLetter);
			return newStr;
		}
		return str;
	}

	function checkWord(userGuess: string, curRow: number) {
		const newMatrix = [...refMatrix];
		const guessed = { ...guessedLetters };

		for (let i = 0; i < 5; i++) {
			const checkedLetter = switchFinalLetters(newMatrix[curRow][i].content);
			const theWordCurLetter = switchFinalLetters(theWord[i]);
			const theWordNoFinals = switchFinalLetters(theWord);
			if (checkedLetter === theWordCurLetter) {
				newMatrix[curRow][i].status = "bull";
				guessed.bull.push(checkedLetter);
				setGuessedLetters(guessed);
			} else if (theWordNoFinals.includes(checkedLetter)) {
				newMatrix[curRow][i].status = "cow";
				guessed.cow.push(checkedLetter);
			} else {
				newMatrix[curRow][i].status = "wrong";
				guessed.wrong.push(checkedLetter);
			}
		}
		if (userGuess === theWord) {
			setWinIndicator(true);
			setActiveGame(false);
			console.log("success");
		} else if (curRow === 5 && userGuess !== theWord) {
			setActiveGame(false);
			console.log("fail");
		}
		setRefMatrix(newMatrix);
	}

	function handleKeyDown(ev: KeyboardEvent<HTMLDivElement>) {
		if (helpVisable && ev.key === "Escape") {
			setHelpVisable(false);
		}
		if (activeGame) {
			let key = ev.key;
			const { curRow, curCell } = currentCell;
			if (["Backspace", "Delete", "del"].includes(key)) {
				handleDelete(currentCell, refMatrix);
			} else if (containsHeb(key)) {
				if (curCell === 4 && "כמנצפ".includes(key)) {
					switch (key) {
						case "כ":
							key = "ך";
							break;
						case "מ":
							key = "ם";
							break;
						case "נ":
							key = "ן";
							break;
						case "פ":
							key = "ף";
							break;
						case "צ":
							key = "ץ";
							break;
					}
				}
				const newMatrix = [...refMatrix];
				newMatrix[curRow][curCell].content = key;
				setRefMatrix(newMatrix);
				nextCell(currentCell);
				if (curCell === 4) {
					console.log("checking user guess");
					let userGuess = "";
					for (let i = 0; i < 5; i++) {
						userGuess += refMatrix[curRow][i].content;
					}
					checkWord(userGuess, curRow);
				}
				if ((curRow === 5 && curCell === 4) || winIndicator) {
					setActiveGame(false);
				}
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
		setActiveGame,
		nextCell,
		prevCell,
		handleDelete,
		containsHeb,
		handleKeyDown,
		checkWord,
		helpVisable,
		toggleHelpVisability,
		loginVisable,
		toggleLoginVisability,
		theWord,
	};
}
