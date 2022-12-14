import React from "react";
import { InputGrid } from "./components/InputGrid";
import { Keyboard } from "./components/Keyboard";
import { CurrentCellContex } from "./context/CurrentCellContext";
import "./wordle.scss";

function App(): JSX.Element {
	return (
		<CurrentCellContex.Provider value={null}>
			<header>
				<h1>וורדל!</h1>
			</header>
			<section className="input-zone">
				<InputGrid />
			</section>
			<section className="keyboard-zone">
				<Keyboard />
			</section>
		</CurrentCellContex.Provider>
	);
}

export default App;
