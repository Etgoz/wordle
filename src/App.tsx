import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { WordleApp } from "./components/WordleApp";
import { AppContext } from "./context/AppContext";
import { useWordle } from "./hooks/useWordle";
import "./wordle.scss";

function App(): JSX.Element {
	const wordleApi = useWordle();
	const location = useLocation();
	const [hasLoaded, setHasLoaded] = useState(false);

	useEffect(() => {
		if (hasLoaded && location.pathname === "/") {
			// Redirect to the desired page
			window.location.replace("/welcome");
			setHasLoaded(true);
		}
	}, [hasLoaded, location]);

	return (
		<AppContext.Provider value={wordleApi}>
			<WordleApp />
		</AppContext.Provider>
	);
}

export default App;
