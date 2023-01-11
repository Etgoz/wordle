import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export function Keyboard(): JSX.Element {
	const {
		currentCell,
		refMatrix,
		setRefMatrix,
		nextCell,
		handleDelete,
		guessedLetters,
		checkWord,
		lastCellIndicator,
		setLastCellIndicator,
	} = useContext(AppContext);
	const { curRow, curCell } = currentCell;

	const firstLineLetters = ["פ", "ו", "ט", "א", "ר", "ק"];
	const secondLineLetters = ["ל", "ח", "י", "ע", "כ", "ג", "ד", "ש"];
	const thirdLineLetters = ["ת", "צ", "מ", "נ", "ה", "ב", "ס", "ז"];

	function handleClick(ev: any) {
		if (!lastCellIndicator) {
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
				setLastCellIndicator(true);
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
		<>
			<div className="keyboard" id="top-line">
				{/* <button type="button" id="submit">
						שלח
					</button> */}
				<button
					onClick={() => handleDelete(currentCell, refMatrix)}
					type="button"
					id="del"
				>
					del
				</button>
				{firstLineLetters.map((letter) => {
					return (
						<button
							onClick={handleClick}
							type="button"
							key={letter}
							className={letterClass(letter)}
						>
							{letter}
						</button>
					);
				})}
			</div>
			<div className="keyboard" id="mid-line">
				{secondLineLetters.map((letter) => {
					return (
						<button
							onClick={handleClick}
							type="button"
							key={letter}
							className={letterClass(letter)}
						>
							{letter}
						</button>
					);
				})}
			</div>
			<div className="keyboard" id="bottom-line">
				{thirdLineLetters.map((letter) => {
					return (
						<button
							onClick={handleClick}
							type="button"
							key={letter}
							className={letterClass(letter)}
						>
							{letter}
						</button>
					);
				})}
			</div>
		</>
	);
}
