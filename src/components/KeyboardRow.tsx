import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { IUseWordle } from "../hooks/useWordle";

export interface IKeyboardRow {
	letters: string[];
}
export function KeyboardRow({ letters }: IKeyboardRow): JSX.Element {
	const {
		guessedLetters,
		activeGame,
		checkUserGuess,
		currentCell,
		refMatrix,
		setRefMatrix,
		nextCell,
		winIndicator,
		setActiveGame,
		setTheWord,
	}: IUseWordle = useContext(AppContext);

	function handleVirtualKeyboardClick(ev: any) {
		if (activeGame) {
			let key = ev.target.innerText;
			const { curRow, curCell } = currentCell;
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
			newMatrix[curRow][curCell].content = key;
			setRefMatrix(newMatrix);
			nextCell(currentCell);
			if (curCell === 4) {
				checkUserGuess(key);
			}
			if ((curRow === 5 && curCell === 4) || winIndicator) {
				fetch("http://localhost:3001/word")
					.then((response) => response.text())
					.then((word) => {
						setTheWord(word);
						setActiveGame(false);
					})
					.catch((e) => console.log(e));
			}
		}
	}

	function letterClass(letter: string): string {
		if (guessedLetters.bull.includes(letter)) {
			return "bull";
		} else if (guessedLetters.cow.includes(letter)) {
			return "cow";
		} else if (guessedLetters.wrong.includes(letter)) {
			return "wrong";
		} else {
			return "";
		}
	}

	return (
		<div className="keyboard">
			{letters.map((letter) => {
				return (
					<button
						onClick={handleVirtualKeyboardClick}
						type="button"
						key={letter}
						className={letterClass(letter)}
					>
						{letter}
					</button>
				);
			})}
		</div>
	);
}
