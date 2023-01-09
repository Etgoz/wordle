import React from "react";

export function Header(): JSX.Element {
	return (
		<header>
			<div className="userArea">
				<button type="button">log in</button>
				<button type="button">sign up</button>
				<span>שלום אורח!</span>
			</div>
			<h1>וורדל!</h1>
			<button type="button" id="helpButton">
				?
			</button>
		</header>
	);
}
