import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { InputGrid } from "./InputGrid";
import { Keyboard } from "./Keyboard";
import { Header } from "./Header";
import { HelpModal } from "./HelpModal";

export function WordleApp(): JSX.Element {
	const { handleKeyDown, helpVisable } = useContext(AppContext);

	return (
		<>
			<div onKeyDown={handleKeyDown}>
				<Header />
				<section className="input-zone">
					<InputGrid />
				</section>
				<section className="keyboard-zone">
					<Keyboard />
				</section>
			</div>
			{helpVisable && <HelpModal />}
		</>
	);
}
