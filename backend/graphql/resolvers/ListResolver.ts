import mongoose, { ObjectId } from 'mongoose';
import { Resolver, Query, Arg, ObjectType, Field, FieldResolver, Root, createUnionType, Mutation, ID, InputType } from "type-graphql";
import { List, ListModel, MaybeList } from "../types/List";
import { Term, TermModel } from "../types/Term";
import { maybeDeleteTerms } from "../helpers/term";
import { ListUpdateAction, ListUpdatePayload, NewListFromClient } from "../types/input_types/list";
import { createListDocument, deleteListFromUser, updateListDocument } from "../helpers/list";

@ObjectType()
class TermId {
    @Field(() => ID)
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
        @Arg("owner") owner: string,
        @Arg("populate", type => [String], { nullable: true }) populate: [string]
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
        @Arg("populate", type => [String], { nullable: true }) populate: [string]
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
        @Arg("populate", type => Boolean, { nullable: true }) populate: boolean
    ) {
        
        if (populate) {
            // @ts-ignore - typegoose quirkiness again. requires callabck even though those are optional. doesn't notice that list.terms are already _ids
            return await TermModel.find({ _id: { $in: list.terms }}).lean().exec();
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
            const listDeletedFromUserBoolean = await deleteListFromUser(deletedList._id, deletedList.owner);
            const deletedTerms = await maybeDeleteTerms(deletedList.terms.map(term => (term._id)));

            if (listDeletedFromUserBoolean && deletedTerms?.deletedCount) {
                return { success: true }
            }
        } 

        return { error: true }
    };

    @Mutation(() => MaybeList, { description: "Add a list document to the database, append its ._id to its parent user's .lists array"})
    async createList(
        @Arg("newList") newList: NewListFromClient
    ) {
        const savedList = await createListDocument(newList);
        if (savedList) {
            return { list: savedList }
        } else {
            return { error: "Failed to save list to database" }
        }
    }

    @Mutation(() => MaybeList)
    async updateList(
        @Arg("listId") listId: string,
        @Arg("action") action: ListUpdateAction,
        @Arg("payload") payload: ListUpdatePayload
    ) {
        const updatedList = await updateListDocument(listId, action, payload);

        return updatedList ? { list: updatedList.value } : { error: 'Failed to update list name in database' }
    }
}

@ObjectType()
class SuccessOrError {
    @Field({ nullable: true })
    success?: boolean

    @Field({ nullable: true })
    error?: boolean
};