import { Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx } from "type-graphql";
import { List, ListModel } from "../types/List";

@Resolver()
export class ListResolver {
    @Query(type => [List])
    async listsByUser(
        @Arg("owner") owner: String
    ) {
        return await ListModel
            .find({ owner })
            .populate('terms')
            .lean()
            .exec()
    }

    @Query(type => List)
    async listById(
        @Arg("id") id: String
    ) {
        // return await ListModel.findById(id)
    }

}