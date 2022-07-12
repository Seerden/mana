// @ts-nocheck

export async function queryListsById(ids: string[], populate: string[]) {
    let _ids = ids.map((id) => new mongoose.Types.ObjectId(id));

    if (populate) {
        return await ListModel.find({ _id: { $in: _ids } })
            .populate(populate)
            .lean()
            .exec();
    }

    return await ListModel.find({ _id: { $in: _ids } })
        .lean()
        .exec();
}
