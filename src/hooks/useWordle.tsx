import { useState } from "react";

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
		newMatrix[curRow][curCell].content = "";
		setRefMatrix(newMatrix);
		if (curCell !== 0) {
			prevCell(currentCell);
		}
	}

	function containsHeb(str: string): boolean {
		return /[א-ת]/.test(str);
	}

	return {
		currentCell,
		setCurrentCell,
		refMatrix,
		setRefMatrix,
		nextCell,
		prevCell,
		handleDelete,
		containsHeb,
	};
}
