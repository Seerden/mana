import { getUserFromLocalStorage } from "helpers/local-storage";
import { atom } from "recoil";

export const currentUserState = atom<string | null>({
	key: "currentUserState",
	default: getUserFromLocalStorage(),
});
