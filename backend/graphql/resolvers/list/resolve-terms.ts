// @ts-nocheck

export function resolveTerms(list, populate) {
    if (populate) {
        return await TermModel.find({ _id: { $in: list.terms } })
            .lean()
            .exec();
    }

    return list.terms.map((_id) => ({ _id }));
}
