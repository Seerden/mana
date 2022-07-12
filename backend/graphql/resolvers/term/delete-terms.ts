// @ts-nocheck

export async function deleteTerms(listId, remainingTermIds, ids) {
    // remove term from list.terms array
    const updatedList = await updateListTerms(listId, remainingTermIds);
    // delete term(s) entirely if they only exist in one list
    const termsDeleted = await maybeDeleteTerms(
        ids.map((id) => new mongoose.Types.ObjectId(id))
    );
    if (updatedList && termsDeleted) {
        return { success: "Terms deleted and removed from list successfully" };
    }
    return { error: "Error deleting terms" };
}
