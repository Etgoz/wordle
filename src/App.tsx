import React from "react";
import { WordleApp } from "./components/WordleApp";
import { AppContext } from "./context/AppContext";
import { useWordle } from "./hooks/useWordle";
import "./wordle.scss";

function App(): JSX.Element {
	const wordleApi = useWordle();

	return (
		<AppContext.Provider value={wordleApi}>
			<WordleApp />
		</AppContext.Provider>
	);
}

export default App;
