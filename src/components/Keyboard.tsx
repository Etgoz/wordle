import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export function Keyboard(): JSX.Element {
	const {
		currentCell,
		refMatrix,
		setRefMatrix,
		nextCell,
		handleDelete,
		checkWord,
		winIndicator,
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
					userGuess.concat(refMatrix[curRow][i].content);
				}
				checkWord(userGuess, curRow);
			}
			if ((curRow === 5 && curCell === 4) || winIndicator) {
				setLastCellIndicator(true);
			}
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
						<button onClick={handleClick} type="button" key={letter}>
							{letter}
						</button>
					);
				})}
			</div>
			<div className="keyboard" id="mid-line">
				{secondLineLetters.map((letter) => {
					return (
						<button onClick={handleClick} type="button" key={letter}>
							{letter}
						</button>
					);
				})}
			</div>
			<div className="keyboard" id="bottom-line">
				{thirdLineLetters.map((letter) => {
					return (
						<button onClick={handleClick} type="button" key={letter}>
							{letter}
						</button>
					);
				})}
			</div>
		</>
	);
}
