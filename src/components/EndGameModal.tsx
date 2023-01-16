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
	} = useContext(AppContext);

	function handleNewGame() {
		winIndicator && setWinIndicator(false);
		setRefMatrix(matrix);
		setCurrentCell({ curRow: 0, curCell: 0 });
		setGuessedLetters({ bull: [], cow: [], wrong: [] });
		setActiveGame(true);
	}

	return (
		<div className="background">
			<div className="textArea">
				{winIndicator ? <div>כל הכבוד!</div> : <div>ניסיון יפה!</div>}
				<button type="button" onClick={handleNewGame}>
					משחק חדש
				</button>
			</div>
		</div>
	);
}
