import { getUserFromLocalStorage } from "helpers/localStorageHelpers";
import { atom } from "recoil";


export const currentUserState = atom<String | null>({
    key: "currentUserState",
    default: getUserFromLocalStorage()
})