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

export function useWordle() {
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

	const [lastCellIndicator, setLastCellIndicator] = useState<boolean>(false);

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

	const theWord = "??????????";

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
		if (curRow !== 5 && curCell !== 4) {
			newMatrix[curRow][curCell].content = "";
			setRefMatrix(newMatrix);
			if (curCell !== 0) {
				prevCell(currentCell);
			}
		}
	}

	function containsHeb(str: string): boolean {
		return /[??-??]/.test(str);
	}

	function switchFinalLetters(str: string): string {
		let char = str.substring(str.length - 1);
		let replaceLetter = "";
		if ("??????????".includes(char)) {
			switch (char) {
				case "??":
					replaceLetter = "??";
					break;
				case "??":
					replaceLetter = "??";
					break;
				case "??":
					replaceLetter = "??";
					break;
				case "??":
					replaceLetter = "??";
					break;
				case "??":
					replaceLetter = "??";
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
			setLastCellIndicator(true);
			console.log("success");
		} else if (curRow === 5 && userGuess !== theWord) {
			console.log("fail");
		}
		setRefMatrix(newMatrix);
	}

	function handleKeyDown(ev: KeyboardEvent<HTMLDivElement>) {
		if (helpVisable && ev.key === "Escape") {
			setHelpVisable(false);
		}
		if (!lastCellIndicator) {
			let key = ev.key;
			const { curRow, curCell } = currentCell;
			if (["Backspace", "Delete", "del"].includes(key)) {
				handleDelete(currentCell, refMatrix);
			} else if (containsHeb(key)) {
				if (curCell === 4 && "??????????".includes(key)) {
					switch (key) {
						case "??":
							key = "??";
							break;
						case "??":
							key = "??";
							break;
						case "??":
							key = "??";
							break;
						case "??":
							key = "??";
							break;
						case "??":
							key = "??";
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
					setLastCellIndicator(true);
				}
			}
		}
	}

	return {
		currentCell,
		setCurrentCell,
		refMatrix,
		setRefMatrix,
		winIndicator,
		lastCellIndicator,
		guessedLetters,
		setLastCellIndicator,
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
	};
}
