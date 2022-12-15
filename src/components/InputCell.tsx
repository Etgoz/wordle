import React, { useContext, KeyboardEvent } from "react";
import { AppContext } from "../context/AppContext";

type CellProps = {
	rowNumber: number;
	cellNumber: number;
};

export function InputCell({ rowNumber, cellNumber }: CellProps): JSX.Element {
	let { currentCell, refMatrix } = useContext(AppContext);
	const { curRow, curCell } = currentCell;
	const isCurrentCell: boolean = rowNumber === curRow && cellNumber === curCell;

	function containsHeb(str: string): boolean {
		return /[\u0590-\u05FF]/.test(str);
	}

	function handleKeyboard(ev: KeyboardEvent<HTMLDivElement>) {
		if (containsHeb(ev.key)) {
		}
	}
	return (
		<div
			className={`input ${isCurrentCell && "focused"}`}
			tabIndex={0}
			onKeyDown={handleKeyboard}
		>
			{isCurrentCell && refMatrix[curRow][curCell]}
		</div>
	);
}
