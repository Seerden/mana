// @ts-nocheck
export async function createReviewSession(newReviewSession, termUpdateArray) {
    const newReviewSessionDocument = new ReviewSessionModel(newReviewSession);
    const savedReviewSession = await newReviewSessionDocument.save();
    if (savedReviewSession) {
        await bulkUpdateTerms(termUpdateArray);
        await maybeAddSessionToList(
            savedReviewSession._id,
            savedReviewSession.settings.sessionEnd,
            savedReviewSession.settings.direction,
            savedReviewSession.listIds.map((entry) => asObjectId(entry._id))
        );
        return { savedReviewSession };
    }
    return { error: "Failed to save review session to database" };
}
