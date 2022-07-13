import { ExpressContext } from "apollo-server-express";
import {
   Arg,
   Ctx,
   Field,
   FieldResolver,
   Int,
   Mutation,
   ObjectType,
   Query,
   Resolver,
   Root,
} from "type-graphql";
import { ListUpdatePayload, NewList } from "../types/input_types/list";
import { List, ListAndTerms, MaybeList } from "../types/List";
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

   // @Query(() => [ListAndTerms], { nullable: "items" })
   // async listsByUserWithTerms(@Arg("user_id") user_id: number) {
   //    // TODO: this probably needs to be adjusted if we want to properly resolve
   //    // .terms field with a FieldResolver
   //    return await queryListsWithTermsByUser(user_id);
   // }

   @Query(() => [List])
   async listsById(
      @Arg("ids", () => [Int]) ids: [number],
      @Ctx() { req }: ExpressContext
   ) {
      return await queryListsById(ids, { req });
   }

   // TODO: rethink how we approach this, since lists don't have .terms by
   // default, now.
   @FieldResolver(() => Term)
   async terms(
      @Root() list: List,
      @Arg("populate", { nullable: true }) populate?: boolean
   ) {
      return await resolveTerms(list, populate);
   }

   @Mutation(() => SuccessOrError)
   // TODO: add auth middleware
   // TODO: reconcile return type with new function implementation
   async deleteList(@Arg("listIds", () => [Int]) listIds: [number]) {
      return await deleteListsById(listIds);
   }

   // TODO: this should really return a union of ListAndTerms | {error of some kind}
   @Mutation(() => ListAndTerms)
   async createList(@Arg("newList") newList: NewList) {
      return await createList(newList);
   }

   @Mutation(() => MaybeList)
   async updateList(
      @Arg("list_id") list_id: number,
      @Arg("payload") payload: ListUpdatePayload
   ) {
      return await updateListName(list_id, payload);
   }
}

@ObjectType()
class SuccessOrError {
   @Field({ nullable: true })
   success?: boolean;

   @Field({ nullable: true })
   error?: boolean;
}
