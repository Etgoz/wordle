import React, { useContext, KeyboardEvent } from "react";
import { AppContext } from "../context/AppContext";
import { InputGrid } from "./InputGrid";
import { Keyboard } from "./Keyboard";
import { Header } from "./Header";

export function WordleApp(): JSX.Element {
	const {
		currentCell,
		refMatrix,
		handleDelete,
		setRefMatrix,
		nextCell,
		containsHeb,
	} = useContext(AppContext);

	function handleKeyDown(ev: KeyboardEvent<HTMLDivElement>) {
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
			newMatrix[curRow][curCell] = key;
			setRefMatrix(newMatrix);
			nextCell(currentCell);
			if (curCell === 4) {
				console.log("done");
			}
		}
	}
	return (
		<div onKeyDown={handleKeyDown}>
			<Header />
			<section className="input-zone">
				<InputGrid />
			</section>
			<section className="keyboard-zone">
				<Keyboard />
			</section>
		</div>
	);
}
