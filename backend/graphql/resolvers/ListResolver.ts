import { ExpressContext } from "apollo-server-express";
import {
   Arg,
   Authorized,
   Ctx,
   FieldResolver,
   Int,
   Mutation,
   Query,
   Resolver,
   Root,
} from "type-graphql";
import { ListUpdatePayload, NewListWithoutUserId } from "../types/input_types/list";
import { List, ListAndTerms } from "../types/List";
import { Term } from "../types/Term";
import { createList } from "./list/create-list";
import { deleteListsById } from "./list/delete-list";
import { queryListsById } from "./list/query-by-id";
import { queryListsByUser } from "./list/query-by-user";
import { resolveTerms } from "./list/resolve-terms";
import { updateListName } from "./list/update-list";

@Resolver(() => List)
export class ListResolver {
   @Query(() => [List])
   async listsByUser(@Arg("user_id") user_id: number) {
      return await queryListsByUser(user_id);
   }

   @Query(() => [List])
   // NOTE: `queryListsById` already filters by user_id, so this doesn't need Authorized()
   async listsById(
      @Arg("ids", () => [Int]) ids: [number],
      @Ctx() { req }: ExpressContext
   ) {
      return await queryListsById(ids, { req });
   }

   @FieldResolver(() => [Term], { nullable: "items" })
   @Authorized()
   async terms(
      @Root() list: List,
      @Arg("user_id") user_id: number,
      @Arg("populate", { nullable: true }) populate?: boolean
   ) {
      return await resolveTerms(list, populate);
   }

   @Mutation(() => ListAndTerms)
   @Authorized()
   async deleteList(
      @Arg("user_id") user_id: number, // Not used, but necessary for Authorized middleware
      @Arg("listIds", () => [Int]) listIds: [number]
   ) {
      return await deleteListsById(listIds);
   }

   @Mutation(() => ListAndTerms)
   @Authorized()
   async createList(
      @Arg("user_id") user_id: number,
      @Arg("newList") newList: NewListWithoutUserId
   ) {
      return await createList(user_id, newList);
   }

   @Mutation(() => List, { nullable: true })
   @Authorized()
   async updateList(
      @Arg("user_id") user_id: number,
      @Arg("list_id") list_id: number,
      @Arg("payload") payload: ListUpdatePayload
   ) {
      return await updateListName(list_id, payload);
   }
}
