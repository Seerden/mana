import { ListModel } from "../graphql/types/List";
import mongoose from 'mongoose';
import { ReviewSessionModel } from "../graphql/types/ReviewSession";
import { Term } from "../graphql/types/Term";

export async function removeExistingListSessions() {
    const bulkOps = [];

    const lists = await ListModel.find({});

    for (const list of lists) {
        const operation = {
            updateOne: {
                filter: { name: list.name },
                update: {
                    $set: {
                        sessions: new Array()
                    }
                }
            }
        };

        bulkOps.push(operation);
    };

    if (bulkOps.length > 0) {
        console.log(bulkOps[0]);
        const bulkWriteResult = await ListModel.bulkWrite(bulkOps);

        return bulkWriteResult.result;
    }
}

export async function findListsWithSessions() {
    const lists = await ListModel.find({});

    const withSessions = lists.map(list => Object.keys(list).includes('sessions'));

    console.log(withSessions);
}

export async function findOneList() {
    return await ListModel.findOne({});
}

export async function findOneListById(id) {
    return await ListModel.findById(id);
};

async function setEmptyListReviewDateArrays() {
    const updatedLists = await ListModel.updateMany({}, {
        $set: {
            reviewDates: {
                forwards: new Array<Date>(),
                backwards: new Array<Date>()
            }
        }
    }, { new: true, rawResult: true });

    return [updatedLists.ok, updatedLists.nModified];
}

async function unsetAllListStates() {
    return await ListModel.updateMany({}, {
        $unset: {
            state: 1
        }
    })
}

async function copyListToTestAccount() {
    const list = await ListModel.findOne({ owner: 'seerden', name: 'KKLC 0271-0300'}).populate('terms');
    delete list._id;
    list.owner = 'test';
    const newList = new ListModel(list);
    const savedList = await newList.save();
    console.log(savedList);
}

async function logTestListTermHistories() {
    const list = await ListModel.findOne({ owner: 'test', name: 'KKLC 0271-0300' }).populate('terms').lean().exec();

    for (const term of list.terms) {
        try {
            //@ts-ignore
            // console.log(term.history)
        } catch (error) {
            console.log(error);
        }
    }
}

export async function inspectDatabase() {
    // await copyListToTestAccount();
    // await logTestListTermHistories();



}
