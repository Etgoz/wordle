import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/help",
		element: <h1>help</h1>,
	},
]);
