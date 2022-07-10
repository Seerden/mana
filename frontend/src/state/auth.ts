import { getUserFromLocalStorage } from "helpers/local-storage";
import { atom, selector } from "recoil";

export const currentUserState = atom<string | null>({
	key: "currentUserState",
	default: getUserFromLocalStorage(),
});

export const isLoggedInState = selector<boolean>({
	key: "isLoggedIn",
	get: ({ get }) => !!get(currentUserState),
});
