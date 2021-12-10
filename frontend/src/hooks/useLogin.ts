import {
    putUserInLocalStorage,
    removeUserFromLocalStorage,
} from "helpers/localStorage-helpers";
import { useCallback, useMemo } from "react";
import { useRecoilState } from "recoil";
import { currentUserState } from "state/atoms/authAtoms";

export function useLogin() {
    const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
    const isLoggedIn = useMemo(() => {
        return currentUser ? true : false;
    }, [currentUser]);

    const login = useCallback(
        (username) => {
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
