import { putUserInLocalStorage, removeUserFromLocalStorage } from "helpers/localStorageHelpers";
import { useCallback, useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { currentUserState } from "recoil/atoms/authAtoms";

export function useLogin() {
    const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
    const isLoggedIn = useMemo(() => {
        return currentUser ? true : false;
    }, [currentUser])

    const login = useCallback((username) => {
        putUserInLocalStorage(username);
        setCurrentUser(username);
    }, [currentUser, setCurrentUser])

    const logout = useCallback(() => {
        setCurrentUser(null);
        removeUserFromLocalStorage();
    }, [currentUser, setCurrentUser])

    useEffect(() => {
        if (currentUser) {
            console.log(`Current user from useLogin: ${currentUser}`);
        }
    }, [currentUser])

    return { login, logout, currentUser, isLoggedIn }
}