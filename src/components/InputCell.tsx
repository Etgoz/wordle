import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

type CellProps = {
	rowNumber: number;
	cellNumber: number;
};

export function InputCell({ rowNumber, cellNumber }: CellProps): JSX.Element {
	let { currentCell, refMatrix } = useContext(AppContext);
	const { curRow, curCell } = currentCell;
	const isCurrentCell: boolean = rowNumber === curRow && cellNumber === curCell;

	return (
		<div className={`input ${isCurrentCell && "focused"}`} tabIndex={0}>
			{refMatrix[rowNumber][cellNumber].content}
		</div>
	);
}
