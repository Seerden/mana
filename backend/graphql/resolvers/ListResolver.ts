import {
    Arg,
    Field,
    FieldResolver,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    Root,
} from "type-graphql";
import {
    ListUpdateAction,
    ListUpdatePayload,
    NewListFromClient,
} from "../types/input_types/list";
import { List, MaybeList } from "../types/List";
import { Term } from "../types/Term";
import { createList } from "./list/create-list";
import { deleteListById } from "./list/delete-list";
import { queryListsById } from "./list/query-by-id";
import { queryListsByUser } from "./list/query-by-user";
import { resolveTerms } from "./list/resolve-terms";
import { updateList } from "./list/update-list";

@Resolver((of) => List)
export class ListResolver {
    @Query((type) => [List], { name: "listsByUser", description: "Find lists by user" })
    async listsByUser(
        @Arg("owner") owner: string,
        @Arg("populate", (type) => [String], { nullable: true }) populate: [string]
    ) {
        return await queryListsByUser(owner, populate);
    }

    @Query((type) => [List], { name: "listsById", description: "Query lists by id" })
    async listsById(
        @Arg("ids", (type) => [String]) ids: [string],
        @Arg("populate", (type) => [String], { nullable: true }) populate: [string]
    ) {
        return await queryListsById(ids, populate);
    }

    @FieldResolver(() => Term, { description: "Resolves ListModel.terms" })
    async terms(
        @Root() list: List,
        @Arg("populate", (type) => Boolean, { nullable: true }) populate: boolean
    ) {
        return await resolveTerms(list, populate);
    }

    @Mutation(() => SuccessOrError)
    // @todo: add auth middleware
    async deleteList(@Arg("listId") listId: string): Promise<SuccessOrError> {
        return await deleteListById(listId);
    }

    @Mutation(() => MaybeList, {
        description:
            "Add a list document to the database, append its ._id to its parent user's .lists array",
    })
    async createList(@Arg("newList") newList: NewListFromClient) {
        return await createList(newList);
    }

    @Mutation(() => MaybeList)
    async updateList(
        @Arg("listId") listId: string,
        @Arg("action") action: ListUpdateAction,
        @Arg("payload") payload: ListUpdatePayload
    ) {
        return await updateList(listId, action, payload);
    }
}

@ObjectType()
class SuccessOrError {
    @Field({ nullable: true })
    success?: boolean;

    @Field({ nullable: true })
    error?: boolean;
}
