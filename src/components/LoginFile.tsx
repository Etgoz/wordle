import React, { useContext, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";
import "../modal.scss";

export function LoginFile(): JSX.Element {
	const { setUserName } = useContext(AuthContext);
	const { toggleLoginVisability } = useContext(AppContext);
	const nameInputRef = useRef<HTMLInputElement>(null);

	function handleSubmit() {
		const curUserName = nameInputRef.current!.value;
		setUserName(curUserName);
		localStorage.setItem("userName", curUserName);
		console.log(curUserName, "\n", localStorage.getItem("userName"));
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
