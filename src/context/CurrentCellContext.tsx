import React, { createContext } from "react";

interface CurrentCellContex {
	cell: JSX.Element;
	coordinate: string;
	content: string;
}

export const CurrentCellContex = createContext<CurrentCellContex | null>(null);
