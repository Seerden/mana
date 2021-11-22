import { getUserFromLocalStorage } from "helpers/localStorageHelpers";
import { atom } from "recoil";

export const currentUserState = atom<string | null>({
	key: "currentUserState",
	default: getUserFromLocalStorage(),
});
