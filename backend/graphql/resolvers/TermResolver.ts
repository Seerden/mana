import mongoose from "mongoose";
import { Arg, Field, InputType, Int, Mutation, ObjectType, Resolver } from "type-graphql";
import { addTermsToList, updateListTerms } from "../helpers/list";
import {
    bulkEditTerms,
    bulkUpdateTerms,
    createTermDocuments,
    maybeDeleteTerms,
} from "../helpers/term";
import { TermEditObject, TermUpdateObject } from "../types/input_types/term";
import { TermLanguages, TermSaturation } from "../types/Term";

// We currently don't query terms by themselves,
//  only as part of their parent list's queries,
//   but this might change in the future

@InputType({
    description:
        "New term created client-side, excludes history and saturation fields, since those don't exist yet for the term",
})
export class NewTermFromClient {
    @Field()
    to: string;

    @Field()
    from: string;

    @Field(() => TermLanguages)
    languages: TermLanguages;

    @Field()
    owner: string;

    @Field(() => TermSaturation)
    saturation: TermSaturation;

    @Field(() => [String])
    listMembership: Array<String>;
}

@ObjectType()
class ErrorOrSuccess {
    @Field({ nullable: true })
    error?: string;

    @Field({ nullable: true })
    success?: string;
}

@Resolver()
export class TermResolver {
    @Mutation(() => Int)
    async updateTerms(
        @Arg("updateObj", (type) => [TermUpdateObject]) updateObj: [TermUpdateObject]
    ) {
        return await bulkUpdateTerms(updateObj);
    }

    @Mutation(() => Int)
    async editTerms(
        @Arg("updateObj", (type) => [TermEditObject]) updateObj: [TermEditObject]
    ) {
        return await bulkEditTerms(updateObj);
    }

    @Mutation(() => ErrorOrSuccess)
    async createTerms(
        @Arg("terms", (type) => [NewTermFromClient]) terms: [NewTermFromClient]
    ) {
        const maybeCreateTerms = await createTermDocuments(terms, null);

        if (maybeCreateTerms.terms) {
            const listBulkWriteResult = await addTermsToList(maybeCreateTerms.terms);

            if (listBulkWriteResult.modifiedCount > 0) {
                return {
                    success: "Terms successfully saved and added to their parent list(s)",
                };
            }
        }

        return { error: "Error saving terms" };
    }

    @Mutation(() => ErrorOrSuccess)
    async deleteTermsFromList(
        @Arg("listId", (type) => String) listId: string,
        @Arg("remainingTermIds", (type) => [String], { nullable: true })
        remainingTermIds: [string], // @todo: create union here, because this may be an empty array if we're removing the only term in the list
        @Arg("ids", (type) => [String]) ids: [string]
    ) {
        // remove term from list.terms array
        const updatedList = await updateListTerms(listId, remainingTermIds);

        // delete term(s) entirely if they only exist in one list
        const termsDeleted = await maybeDeleteTerms(
            ids.map((id) => new mongoose.Types.ObjectId(id))
        );

        if (updatedList && termsDeleted) {
            return { success: "Terms deleted and removed from list successfully" };
        }

        return { error: "Error deleting terms" };
    }
}
