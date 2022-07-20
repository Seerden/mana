// @ts-nocheck

export async function queryReviewSessionsByUser(owner) {
    return await ReviewSessionModel.find({
        owner,
        "settings.sessionStart": {
            // sessions remaining from old format don't have this property. @todo: convert legacy sessions to new format
            $exists: true,
        },
    })
        .lean()
        .exec();
}
