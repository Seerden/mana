// @ts-nocheck

export async function createTerms(terms) {
    const maybeCreateTerms = await createTermDocuments(terms, null);
    if (maybeCreateTerms.terms) {
        const listBulkWriteResult = await addTermsToList(maybeCreateTerms.terms);
        if (listBulkWriteResult.modifiedCount > 0) {
            return {
                success: "Terms successfully saved and added to their parent list(s)",
            };
        }
    }
    return { error: "Error saving terms" };
}
