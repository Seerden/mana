import { ListModel } from "../graphql/types/List";

async function removeExistingListSessions() {
    const bulkOps = [];

    const lists = await ListModel.find({});

    for (const list of lists) {
        if (list.sessions && list.sessions.length > 0) {
            const operation = {
                updateOne: {
                    filter: { _id: list._id },
                    update: {
                        $set: {
                            sessions: []
                        }
                    }
                }
            };

            bulkOps.push(operation);
        }
    };

    if (bulkOps.length > 0 ) {
        const bulkWriteResult = await ListModel.bulkWrite(bulkOps);

        return bulkWriteResult.result;
    }
}

async function findListsWithSessions() {
    const lists = await ListModel.find({});

    const withSessions = lists.map(list => Object.keys(list).includes('sessions'));

    console.log(withSessions);
}

async function findOneList() {
    return await ListModel.findOne({});
}

export async function inspectDatabase() {
    console.log(await findOneList())
}
