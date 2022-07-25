import { putUserInLocalStorage, removeUserFromLocalStorage } from "helpers/local-storage";
import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState, isLoggedInState } from "state/auth";
import { User } from "../gql/codegen-output";

export function useLogin() {
	const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
	const isLoggedIn = useRecoilValue(isLoggedInState);

	const login = useCallback(
		(username: User["username"]) => {
			putUserInLocalStorage(username);
			setCurrentUser(username);
		},
		[currentUser, setCurrentUser]
	);

	const logout = useCallback(() => {
		setCurrentUser(null);
		removeUserFromLocalStorage();
	}, [currentUser, setCurrentUser]);

	return { login, logout, currentUser, isLoggedIn };
}
