import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";

export function Header(): JSX.Element {
	const { toggleHelpVisability, toggleLoginVisability } =
		useContext(AppContext);
	const { userName, setUserName } = useContext(AuthContext);

	useEffect(() => {
		const storedUserName = localStorage.getItem("userName");
		if (storedUserName) {
			setUserName(storedUserName);
		}
	}, [userName]);

	return (
		<header>
			<div className="userArea">
				{!userName ? (
					<button type="button" onClick={toggleLoginVisability}>
						log in
					</button>
				) : (
					<button
						type="button"
						onClick={() => {
							setUserName(null);
							localStorage.removeItem(userName);
						}}
					>
						log out
					</button>
				)}
				{!userName ? <span>שלום אורח!</span> : <span>שלום {userName}!</span>}
			</div>
			<h1>וורדל!</h1>
			<button type="button" id="helpButton" onClick={toggleHelpVisability}>
				?
			</button>
		</header>
	);
}
