import { NewTermFromClient } from "../resolvers/TermResolver";
import { TermEditObject, TermUpdateObject } from "../types/input_types/term";
import { Term, TermModel } from "../types/Term";

export async function bulkEditTerms(updateObj: Array<TermEditObject>) {
    const bulkOperations = [];

    for (const term of updateObj) {
        const updateSet = {};

        if ('to' in term) {
            updateSet['to'] = term.to;
        }

        if ('from' in term) {
            updateSet['from'] = term.from;
        }

        if (Object.keys(updateSet).length > 0) {
            const operation = {
                updateOne: {
                    filter: { _id: term._id },
                    update: { $set: updateSet }
                }
            };

            bulkOperations.push(operation);
        }
    }

    if (bulkOperations.length > 0) {
        const response = await TermModel.bulkWrite(bulkOperations);

        console.log(response.result);
        return response.modifiedCount;
    }

    return 0
}

export async function bulkUpdateTerms(updateObj: Array<TermUpdateObject>) {
    // write a bulk operation to update all terms
    const bulkOperations = [];

    for (const term of updateObj) {
        const update = {};

        if ('history' in term) {
            update['$push'] = { history: term.history };
        }

        if ('saturation' in term) {
            update['$set'] = { saturation: term.saturation };
        }

        if (Object.keys(update).length > 0) {
            const operation = {
                updateOne: {
                    filter: { _id: term._id },
                    update
                }
            };

            bulkOperations.push(operation);
        }
    }

    if (bulkOperations.length > 0) {
        const response = await TermModel.bulkWrite(bulkOperations);

        console.log(response.result);
        return response.modifiedCount;
    }

    return 0
}

export async function createTermDocuments(terms: Array<NewTermFromClient>) {
    // create a TermModel document for every term in terms

    let savedTerms = await TermModel.insertMany(terms);
    savedTerms = Array.from(savedTerms);  // need to do this to work around mongoose types, 
                                          //  which say savedTerms doesn't have .map property

    if (savedTerms.length === terms.length) {
        // insert every term's id into its parent's .terms array
        return { terms: savedTerms };

    } else {
        // if the terms weren't all properly saved to documents, undo the operation by deleting them again

        const deletedTerms = await TermModel.deleteMany({
            _id: {
                $in: savedTerms.map(term => term._id)
            }
        });

        return { deletedCount: deletedTerms.deletedCount }
    }
}