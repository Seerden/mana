import { ListModel } from "../types/List";
import { Term } from "../types/Term";

export async function addTermsToList(terms: Array<Term>) {
    // extract id and parent list ids
    const termInfo = terms.map(({ _id, listMembership }) => ({
        _id,
        listMembership
    }));

    const bulkOps = [];

    for (const term of termInfo) {
        for (const listId of term.listMembership) {
            const operation = {
                updateOne: {
                    filter: { _id: listId },
                    $push: { terms: term._id }
                }
            };

            bulkOps.push(operation);
        }
    };

    if (bulkOps.length > 0) {
        const bulkWriteResult = await ListModel.bulkWrite(bulkOps);
        return { modifiedCount: bulkWriteResult.modifiedCount }
    }

    return { modifiedCount: 0 }

}