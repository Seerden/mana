// @ts-nocheck

export async function queryListsByUser(owner: string, populate: string[]) {
    const lists = await ListModel.find({ owner })
        // .populate(populate)
        .lean()
        .exec();
    return lists;
}
