import { Arg, createUnionType, Field, InputType, Int, Mutation, ObjectType, Resolver } from "type-graphql";
import { addTermsToList } from "../helpers/list";
import { bulkEditTerms, bulkUpdateTerms, createTermDocuments } from "../helpers/term";
import { Term, TermHistory, TermLanguages, TermModel, TermSaturation } from "../types/Term";

// We currently don't query terms by themselves, only as part of their parent list's queries,
//  but this might change in the future

@InputType()
export class TermUpdateObject {
    @Field()
    _id: string;

    @Field(type => TermHistory, { nullable: true })
    history: TermHistory;

    @Field(type => TermSaturation, { nullable: true })
    saturation: TermSaturation
}

@InputType()
export class TermEditObject {
    @Field()
    _id: string;

    @Field({ nullable: true })
    to: string

    @Field({ nullable: true })
    from: string
}

@InputType({ description: "\
    New term created client-side, excludes history and saturation fields \
    since those don't exist yet for the term" 
})
export class NewTermFromClient {
    @Field()
    to: string;

    @Field()
    from: string;

    @Field()
    languages: TermLanguages;

    @Field()
    owner: string

    @Field(() => TermSaturation)
    saturation: TermSaturation

    @Field(() => [String])
    listMembership: Array<String>
}

@ObjectType()
class ErrorOrSuccess {
    @Field({nullable: true })
    error?: string;

    @Field({nullable: true })
    success?: string;
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

    @Mutation(() => ErrorOrSuccess)
    async createTerms(
        @Arg("terms", type => [NewTermFromClient]) terms: [NewTermFromClient]
    ) {
        const maybeCreateTerms = await createTermDocuments(terms);

        if (maybeCreateTerms.terms) {
            const listBulkWriteResult = await addTermsToList(maybeCreateTerms.terms);

            if (listBulkWriteResult.modifiedCount > 0) {
                return { success: 'Terms successfully saved and added to their parent list(s)'}
            }
        }

        return { error: 'Error saving terms' }
    }

}