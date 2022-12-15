import React from "react";
import { InputCell } from "./InputCell";
type RowProps = {
	rowNumber: number;
};

export function InputRow({ rowNumber }: RowProps): JSX.Element {
	const cellList: number[] = [0, 1, 2, 3, 4];

	const row: JSX.Element = (
		<div className="row-container">
			{cellList.map((i) => {
				return (
					<InputCell
						rowNumber={rowNumber}
						cellNumber={i}
						key={`${rowNumber}, ${i}`}
					/>
				);
			})}
		</div>
	);

	return row;
}
