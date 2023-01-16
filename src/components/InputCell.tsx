import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";

type CellProps = {
	rowNumber: number;
	cellNumber: number;
};

export function InputCell({ rowNumber, cellNumber }: CellProps): JSX.Element {
	let { currentCell, refMatrix } = useContext(AppContext);
	const { curRow, curCell } = currentCell;
	const isCurrentCell: boolean = rowNumber === curRow && cellNumber === curCell;
	const letterStatus = refMatrix[rowNumber][cellNumber].status;
	const cellRef = useRef<HTMLDivElement>(null);

	useEffect(() => cellRef.current!.focus(), [currentCell]);

	return (
		<div
			ref={cellRef}
			className={`input ${isCurrentCell && "focused"} ${letterStatus}`}
			tabIndex={0}
		>
			{refMatrix[rowNumber][cellNumber].content}
		</div>
	);
}
