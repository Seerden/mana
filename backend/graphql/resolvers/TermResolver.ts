import { FilterQuery, UpdateQuery } from "mongoose";
import { Arg, Field, InputType, Int, Mutation, ObjectType, Resolver } from "type-graphql";
import { Term, TermHistory, TermModel, TermSaturation } from "../types/Term";

// We currently don't query terms by themselves, only as part of their parent list's queries,
//  but this might change in the future

@InputType()
class TermUpdateObject {
    @Field()
    _id: string;

    @Field(type => TermHistory, { nullable: true })
    history: TermHistory;

    @Field(type => TermSaturation, { nullable: true })
    saturation: TermSaturation
}

@InputType()
class TermEditObject {
    @Field()
    _id: string;

    @Field({ nullable: true })
    to: string

    @Field({ nullable: true })
    from: string
}

@Resolver()
export class TermResolver {
    @Mutation(() => Int)
    async updateTerms(
        @Arg("updateObj", type => [TermUpdateObject]) updateObj: [TermUpdateObject]
    ) {
        return await bulkUpdateTerms(updateObj)
    }

    @Mutation(() => Int)
    async editTerms(
        @Arg("updateObj", type => [TermEditObject]) updateObj: [TermEditObject]
    ) {
        return await bulkEditTerms(updateObj)
    }

}

async function bulkEditTerms(updateObj: Array<TermEditObject>) {
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
                    update: { $set: updateSet}
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

async function bulkUpdateTerms(updateObj: Array<TermUpdateObject>) {
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
