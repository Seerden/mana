// @ts-nocheck

export async function deleteListById(listId: string) {
    const deletedList = await ListModel.findByIdAndDelete(
        new mongoose.Types.ObjectId(listId),
        null,
        null
    );
    if (deletedList) {
        const listDeletedFromUserBoolean = await deleteListFromUser(
            deletedList._id,
            deletedList.owner
        );
        const deletedTerms = await maybeDeleteTerms(
            deletedList.terms.map((term) => (term instanceof Term ? term._id : term))
        );
        if (listDeletedFromUserBoolean && deletedTerms?.deletedCount) {
            return { success: true };
        }
    }
    return { error: true };
}
