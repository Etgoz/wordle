import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export function Welcome(): JSX.Element {
	return (
		<>
			<h1>Welcome User</h1>
			<Link to="/">למשחק</Link>
		</>
	);
}
