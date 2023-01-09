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

	const theWord = "אפילו";

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
		return /[א-ת]/.test(str);
	}

	function checkWord(userGuess: string, curRow: number) {
		const newMatrix = [...refMatrix];
		if (userGuess === theWord) {
			setWinIndicator(true);
			for (let i = 0; i < 5; i++) {
				newMatrix[curRow][i].status = "bull";
			}
		} else {
			for (let i = 0; i < 5; i++) {
				if (newMatrix[curRow][i].content === theWord[i]) {
					newMatrix[curRow][i].status = "bull";
				} else if (theWord.includes(newMatrix[curRow][i].content)) {
					newMatrix[curRow][i].status = "cow";
				} else {
					newMatrix[curRow][i].status = "wrong";
				}
			}
		}
		setRefMatrix(newMatrix);
	}

	function handleKeyDown(ev: KeyboardEvent<HTMLDivElement>) {
		if (!lastCellIndicator) {
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
						userGuess.concat(refMatrix[curRow][i].content);
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
		setLastCellIndicator,
		nextCell,
		prevCell,
		handleDelete,
		containsHeb,
		handleKeyDown,
		checkWord,
	};
}
