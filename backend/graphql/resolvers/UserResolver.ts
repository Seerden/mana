import { ExpressContext } from "apollo-server-express";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { destroySession } from "../../lib/destroy-session";
import { UserId } from "../helpers/insert-user-id";
import { Roles } from "../helpers/roles";
import { User } from "../types/User";
import { Message } from "../types/utility/message";
import { createUser } from "./user/create-user";
import { deleteUser } from "./user/delete-user";
import { login } from "./user/login";
import { queryAllUsers } from "./user/query-all-users";
import { queryMe } from "./user/query-me";
import { updatePassword, updateUsername } from "./user/update-user";

@Resolver()
export class UserResolver {
   @Query(() => [User])
   @Authorized([Roles.ADMIN])
   async users() {
      return queryAllUsers();
   }

   @Query(() => User)
   async me(@UserId() user_id: number) {
      return queryMe(user_id);
   }

   @Mutation(() => User)
   async createUser(
      @Arg("username") username: string,
      @Arg("password") password: string
   ) {
      return createUser({ username, password });
   }

   @Mutation(() => User)
   async login(
      @Arg("username") username: string,
      @Arg("password") password: string,
      @Ctx() ctx: ExpressContext
   ) {
      return login(username, password, ctx);
   }

   @Mutation(() => Message)
   async logout(@Ctx() ctx: ExpressContext) {
      return destroySession(ctx);
   }

   @Mutation(() => User)
   async updateUsername(
      @UserId() user_id: number,
      @Arg("username")
      username: string
   ) {
      return updateUsername(user_id, username);
   }

   @Mutation(() => User)
   async updatePassword(
      @UserId() user_id: number,
      @Arg("currentPassword") currentPassword: string,
      @Arg("newPassword") newPassword: string
   ) {
      return updatePassword(user_id, currentPassword, newPassword);
   }

   @Mutation(() => User)
   async deleteUser(@UserId() user_id: number) {
      return deleteUser({ user_id });
   }
}
