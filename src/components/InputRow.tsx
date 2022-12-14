import React from "react";

type RowProps = {
	rowNumber: number;
};

export function InputRow({ rowNumber }: RowProps): JSX.Element {
	const cellList: number[] = [0, 1, 2, 3, 4];

	const row: JSX.Element = (
		<div className="row-container">
			{cellList.map((i) => (
				<div className="input" key={`${i}-${rowNumber}`} tabIndex={0}></div>
			))}
		</div>
	);

	return row;
}
