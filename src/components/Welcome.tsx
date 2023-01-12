import React from "react";
import { Link } from "react-router-dom";

export function Welcome(): JSX.Element {
	return (
		<>
			<h1>Welcome User</h1>
			<Link to="/">למשחק</Link>
		</>
	);
}
