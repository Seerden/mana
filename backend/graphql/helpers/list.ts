import { ListModel } from "../types/List";
import { Term } from "../types/Term";
import mongoose from 'mongoose';
import { NewListFromClient } from "../types/input_types/list";
import { appendListIdToTerms, createTermDocuments } from "./term";

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

};

export async function updateListTerms(listId: string, remainingTermIds: [string]) {
    const remainingTermObjectIds = remainingTermIds.map(termId => new mongoose.Types.ObjectId(termId));
    const listObjectId = new mongoose.Types.ObjectId(listId)

    const updatedList = await ListModel.findByIdAndUpdate(listObjectId, {
        $set: {
            // terms is being interpreted as LeanDocument<TermId> instead of just TermId. no clue why
            // @ts-ignore 
            terms: remainingTermObjectIds
        }
    });

    return updatedList;
};

/**
 * Save new terms to database. Save the list itself to the database. Add the list's id to each term's .listMembership array
 */
export async function createListDocument(newList: NewListFromClient) {
    // first, create a new Term instance for every term of the list
    // then, pass these terms' _ids to the new lists's .terms
    const savedTerms = await createTermDocuments(newList.terms, {
        owner: newList.owner,
        from: newList.from,
        to: newList.to
    })

    if (savedTerms.terms) {
        try {
            const termIds = savedTerms.terms.map(term => new mongoose.Types.ObjectId(term._id))
    
            const newListForDatabase = {
                ...newList,
                terms: termIds,
                created: new Date(),
                sessions: new Array(),
                state: {
                    forwards: 'untouched',
                    backwards: 'untouched'
                }
            };
    
            const newListDocument = new ListModel(newListForDatabase);
            const savedList = await newListDocument.save();

            if (savedList) {
                await appendListIdToTerms(savedList._id, termIds);
                return savedList;
            }
            
        } catch (error) {
            console.error(error)
        }
    }

    
}