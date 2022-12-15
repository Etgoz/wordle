import React from "react";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { InputGrid } from "./InputGrid";
import { Keyboard } from "./Keyboard";

export function WordleApp(): JSX.Element {
	const { currentCell } = useContext(AppContext);

	useEffect(() => {}, [currentCell]);

	return (
		<>
			<header>
				<h1>וורדל!</h1>
			</header>
			<section className="input-zone">
				<InputGrid />
			</section>
			<section className="keyboard-zone">
				<Keyboard />
			</section>
		</>
	);
}
