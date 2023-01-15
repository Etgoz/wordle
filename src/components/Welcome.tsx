import React, { useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export function Welcome(): JSX.Element {
	const appAuth = useAuth();
	const curUserName = localStorage.getItem("userName");

	return (
		<AuthContext.Provider value={appAuth}>
			<h1 className="welcome">Welcome {curUserName ? curUserName : "User"}</h1>
			<Link to="/">למשחק</Link>
		</AuthContext.Provider>
	);
}
