import { useState } from "react";

export function useAuth() {
	const [userName, setUserName] = useState(undefined);

	return {
		userName,
		setUserName,
	};
}
