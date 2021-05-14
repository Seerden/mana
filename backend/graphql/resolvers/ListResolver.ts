import { ObjectId } from "mongodb";
import { Resolver, Query, Arg, ObjectType, Field, FieldResolver, Root, createUnionType } from "type-graphql";
import { List, ListModel } from "../types/List";
import { Term, TermModel } from "../types/Term";
import mongoose from 'mongoose';

const MaybeTerms = createUnionType({
    name: "MaybeTerms",
    types: () => [Term, String],
})

@ObjectType()
class TermId {
    @Field(() => String)
    _id: ObjectId
}

export const TermsUnion = createUnionType({
    name: "TermsUnion",
    types: () => { return [Term, TermId] as const },
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

        console.log(list);
        return list.terms.map(_id => ({ _id }));
        
    }

}