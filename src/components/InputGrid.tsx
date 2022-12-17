import React from "react";
import { InputRow } from "./InputRow";

export function InputGrid(): JSX.Element {
	const rowsList: number[] = [0, 1, 2, 3, 4, 5];

	return (
		<div className="input-grid">
			{rowsList.map((i) => (
				<InputRow rowNumber={i} key={i} />
			))}
		</div>
	);
}
