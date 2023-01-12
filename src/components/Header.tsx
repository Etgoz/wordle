import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export function Header(): JSX.Element {
	const { toggleHelpVisability } = useContext(AppContext);

	return (
		<header>
			<div className="userArea">
				<button type="button">log in</button>
				<button type="button">sign up</button>
				<span>שלום אורח!</span>
			</div>
			<h1>וורדל!</h1>
			<button type="button" id="helpButton" onClick={toggleHelpVisability}>
				?
			</button>
		</header>
	);
}
