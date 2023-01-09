import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { InputGrid } from "./InputGrid";
import { Keyboard } from "./Keyboard";
import { Header } from "./Header";

export function WordleApp(): JSX.Element {
	const { handleKeyDown } = useContext(AppContext);

	return (
		<div onKeyDown={handleKeyDown}>
			<Header />
			<section className="input-zone">
				<InputGrid />
			</section>
			<section className="keyboard-zone">
				<Keyboard />
			</section>
		</div>
	);
}
