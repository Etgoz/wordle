import React, { useContext, KeyboardEvent } from "react";
import { AppContext } from "../context/AppContext";
import { InputGrid } from "./InputGrid";
import { Keyboard } from "./Keyboard";

export function WordleApp(): JSX.Element {
	const { currentCell, refMatrix, handleDelete, setRefMatrix, nextCell } =
		useContext(AppContext);

	function containsHeb(str: string): boolean {
		return /[\u0590-\u05FF]/.test(str);
	}

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
				setTimeout(() => alert("done"), 20);
			}
		}
	}
	return (
		<div onKeyDown={handleKeyDown}>
			<header>
				<h1>וורדל!</h1>
			</header>
			<section className="input-zone">
				<InputGrid />
			</section>
			<section className="keyboard-zone">
				<Keyboard />
			</section>
		</div>
	);
}
