import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export function Keyboard() {
	const { currentCell, refMatrix, setRefMatrix, nextCell, handleDelete } =
		useContext(AppContext);
	const { curRow, curCell } = currentCell;

	function handleClick(ev: any) {
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
		newMatrix[curRow][curCell] = letter;
		setRefMatrix(newMatrix);
		nextCell(currentCell);
		if (curCell === 4) {
			setTimeout(() => alert("done"), 100);
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
				<button onClick={handleClick} type="button">
					פ
				</button>
				<button onClick={handleClick} type="button">
					ו
				</button>
				<button onClick={handleClick} type="button">
					ט
				</button>
				<button onClick={handleClick} type="button">
					א
				</button>
				<button onClick={handleClick} type="button">
					ר
				</button>
				<button onClick={handleClick} type="button">
					ק
				</button>
			</div>
			<div className="keyboard" id="mid-line">
				<button onClick={handleClick} type="button">
					ל
				</button>
				<button onClick={handleClick} type="button">
					ח
				</button>
				<button onClick={handleClick} type="button">
					י
				</button>
				<button onClick={handleClick} type="button">
					ע
				</button>
				<button onClick={handleClick} type="button">
					כ
				</button>
				<button onClick={handleClick} type="button">
					ג
				</button>
				<button onClick={handleClick} type="button">
					ד
				</button>
				<button onClick={handleClick} type="button">
					ש
				</button>
			</div>
			<div className="keyboard" id="bottom-line">
				<button onClick={handleClick} type="button">
					ת
				</button>
				<button onClick={handleClick} type="button">
					צ
				</button>
				<button onClick={handleClick} type="button">
					מ
				</button>
				<button onClick={handleClick} type="button">
					נ
				</button>
				<button onClick={handleClick} type="button">
					ה
				</button>
				<button onClick={handleClick} type="button">
					ב
				</button>
				<button onClick={handleClick} type="button">
					ס
				</button>
				<button onClick={handleClick} type="button">
					ז
				</button>
			</div>
		</>
	);
}
