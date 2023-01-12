import React, { useContext, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";
import "../modal.scss";

export function LoginFile(): JSX.Element {
	const { userName, setUserName } = useContext(AuthContext);
	const { toggleLoginVisability } = useContext(AppContext);
	const nameInputRef = useRef<HTMLInputElement>(null);

	function handleSubmit() {
		setUserName(nameInputRef.current?.value);
		localStorage.setItem("userName", userName);
		toggleLoginVisability();
	}

	return (
		<div className="background">
			<div className="textArea">
				<form>
					<label htmlFor="nameInput">שם: </label>
					<input ref={nameInputRef} type="text" name="name" id="nameInput" />
					<button type="button" name="submit" onClick={handleSubmit}>
						שלח
					</button>
				</form>
			</div>
		</div>
	);
}
