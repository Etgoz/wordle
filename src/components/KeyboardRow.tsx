import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export interface IKeyboardRow {
	letters: string[];
}
export function KeyboardRow({ letters }: IKeyboardRow): JSX.Element {
	const {
		currentCell,
		refMatrix,
		setRefMatrix,
		nextCell,
		guessedLetters,
		checkWord,
		activeGame,
		setActiveGame,
	} = useContext(AppContext);

	const { curRow, curCell } = currentCell;

	function handleVirtualKeyboardClick(ev: any) {
		if (activeGame) {
			let letter = ev.target.innerText;
			if (curCell === 4 && "כמנצפ".includes(letter)) {
				switch (letter) {
					case "כ":
						letter = "ך";
						break;
					case "מ":
						letter = "ם";
						break;
					case "נ":
						letter = "ן";
						break;
					case "פ":
						letter = "ף";
						break;
					case "צ":
						letter = "ץ";
						break;
				}
			}
			const newMatrix = [...refMatrix];
			newMatrix[curRow][curCell].content = letter;
			setRefMatrix(newMatrix);
			nextCell(currentCell);
			if (curCell === 4) {
				console.log("checking user guess");
				let userGuess = "";
				for (let i = 0; i < 5; i++) {
					userGuess += refMatrix[curRow][i].content;
				}
				checkWord(userGuess, curRow);
			}
			if (curRow === 5 && curCell === 4) {
				setActiveGame(false);
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
