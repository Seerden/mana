import { ObjectId } from "mongodb";
import { Resolver, Query, Arg, ObjectType, Field, FieldResolver, Root, createUnionType, Mutation, Int, InputType } from "type-graphql";
import { List, ListModel } from "../types/List";
import { Term, TermModel } from "../types/Term";
import mongoose from 'mongoose';
import { maybeDeleteTerms } from "../helpers/term";
import { Ref } from '@typegoose/typegoose';

@ObjectType()
class TermId {
    @Field(() => String)
    _id: ObjectId
}

export const TermsUnion = createUnionType({
    name: "TermsUnion",
    types: () => [Term, TermId],
    resolveType: value => {
        if ("to" in value ) {
            return Term
        }

        return TermId
    }
})

@Resolver(of => List)
export class ListResolver {
    @Query(type => [List], { name: "listsByUser", description: "Find lists by user" })
    async listsByUser(
        @Arg("owner") owner: String,
        @Arg("populate", type => [String], { nullable: true }) populate: [String]
    ) {
        return await ListModel
            .find({ owner })
            // .populate(populate)
            .lean()
            .exec()
    }

    @Query(type => [List], { name: "listsById", description: "Query lists by id" })
    async listsById(
        @Arg("ids", type => [String]) ids: [string],
        @Arg("populate", type => [String], { nullable: true }) populate: [String]
    ) {
        let _ids = ids.map(id => new mongoose.Types.ObjectId(id));

        if (populate) {
            return await ListModel.find({ _id: { $in: _ids } }).populate(populate).lean().exec()
        }

        return await ListModel.find({ _id: { $in: _ids } }).lean().exec();
    }

    @FieldResolver(() => TermsUnion, {description: "Resolves ListModel.terms"})
    async terms(
        @Root() list: List,
        @Arg("populate", type => Boolean, { nullable: true }) populate: Boolean
    ) {
        
        if (populate) {
            return await TermModel.find({ _id: { $in: list.terms } }).lean().exec()    ;
        }

        return list.terms.map(_id => ({ _id }));
        
    }

    @Mutation(() => SuccessOrError)
    // add auth middleware
    async deleteList(
        @Arg("listId") listId: string
    ): Promise<SuccessOrError> {
        const deletedList = await ListModel.findByIdAndDelete(new mongoose.Types.ObjectId(listId), null, null);
        if (deletedList) {
            const deletedTerms = await maybeDeleteTerms(deletedList.terms.map(term => new mongoose.Types.ObjectId(term._id)));

            if (deletedTerms?.deletedCount) {
                return { success: true }
            }
        } 

        return { error: true }
    };
}

@ObjectType()
class SuccessOrError {
    @Field({ nullable: true })
    success?: boolean

    @Field({ nullable: true })
    error?: boolean
};