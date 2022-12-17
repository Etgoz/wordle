import { useState } from "react";

interface currentCellState {
	curRow: number;
	curCell: number;
}

export function useWordle() {
	const [currentCell, setCurrentCell] = useState<currentCellState>({
		curRow: 0,
		curCell: 0,
	});

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

	const matrix = [
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
	];

	const [refMatrix, setRefMatrix] = useState<Array<string[]>>(matrix);

	function handleDelete(
		currentCell: currentCellState,
		refMatrix: Array<string[]>
	) {
		const { curRow, curCell } = currentCell;
		const newMatrix = [...refMatrix];
		newMatrix[curRow][curCell] = "";
		setRefMatrix(newMatrix);
		prevCell(currentCell);
	}

	return {
		currentCell,
		setCurrentCell,
		refMatrix,
		setRefMatrix,
		nextCell,
		prevCell,
		handleDelete,
	};
}
