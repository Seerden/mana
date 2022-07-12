// @ts-nocheck

import { NewListFromClient } from "../../types/input_types/list";

export async function createList(newList: NewListFromClient) {
    const savedList = await createListDocument(newList);
    if (savedList) {
        return { list: savedList };
    } else {
        return { error: "Failed to save list to database" };
    }
}
