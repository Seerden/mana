import { ListModel } from "../graphql/types/List";
import mongoose from 'mongoose';

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

    if (bulkOps.length > 0 ) {
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
}

export async function inspectDatabase() {
    // console.log(await ListModel.find({ _id: "5ff7704e7ad55b187c93641f"}))
}
