// @ts-nocheck

export async function updateList(listId, action, payload) {
    const updatedList = await updateListDocument(listId, action, payload);
    return updatedList
        ? { list: updatedList.value }
        : { error: "Failed to update list name in database" };
}
