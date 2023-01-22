import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import "../modal.scss";

export function EndGameModal(): JSX.Element {
	const {
		winIndicator,
		setWinIndicator,
		setRefMatrix,
		matrix,
		setActiveGame,
		setCurrentCell,
		setGuessedLetters,
		theWord,
	} = useContext(AppContext);

	function handleNewGame() {
		winIndicator && setWinIndicator(false);
		setRefMatrix(matrix);
		setCurrentCell({ curRow: 0, curCell: 0 });
		setGuessedLetters({ bull: [], cow: [], wrong: [] });
		setActiveGame(true);
		fetch("http://localhost:3001/newWord").then((response) => response.text());
	}

	return (
		<div className="background">
			<div className="textArea">
				{winIndicator ? <div>כל הכבוד!</div> : <div>לא נורא, ניסיון יפה!</div>}
				<div style={{ fontSize: "1rem" }}>
					המילה היא: <span>{theWord}</span>
				</div>
				<button type="button" onClick={handleNewGame}>
					משחק חדש
				</button>
			</div>
		</div>
	);
}
