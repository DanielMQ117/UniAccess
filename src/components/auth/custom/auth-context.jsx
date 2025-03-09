"use client";

import * as React from "react";

import { authClient } from "@/lib/custom-auth/client";

export const AuthContext = React.createContext({
	isAuthenticated: false,
	isLoading: true,
	user: null,
	setUser: () => {},
});

export const AuthProvider = ({ children }) => {
	const [state, setState] = React.useState({
		isAuthenticated: false,
		isLoading: true,
		user: null,
	});

	React.useEffect(() => {
		const initialize = async () => {
			const { data } = await authClient.getUser();

			setState((prevState) => ({
				...prevState,
				isAuthenticated: Boolean(data?.user), //data?.user
				isLoading: false,
				user: data?.user ?? null, //data?.user ?? null { data: "user" }
			}));
		};

		initialize();
	}, []);

	const setUser = (user) => {
		setState((prevState) => ({ ...prevState, isAuthenticated: Boolean(user), user }));
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				setUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	const context = React.useContext(AuthContext);

	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
}
