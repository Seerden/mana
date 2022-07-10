import { getUserFromLocalStorage } from "helpers/localStorage-helpers";
import { atom } from "recoil";

export const currentUserState = atom<string | null>({
	key: "currentUserState",
	default: getUserFromLocalStorage(),
});
