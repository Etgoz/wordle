import { useState } from "react";

interface currentCellState {
	curRow: number;
	curCell: number;
}

export function useWordle() {
	const [currentCell, setCurrentCell] = useState<currentCellState | null>({
		curRow: 0,
		curCell: 0,
	});

	function nextCell(currentCellState: currentCellState): void {
		const { curRow, curCell } = currentCellState;
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

	function prevCell(currentCellState: currentCellState): void {
		const { curRow, curCell } = currentCellState;
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

	const [refMatrix, setRefMatrix] = useState<Array<string[]> | null>(matrix);

	return {
		currentCell,
		setCurrentCell,
		refMatrix,
		setRefMatrix,
		nextCell,
		prevCell,
	};
}
