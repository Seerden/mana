import { ExpressContext } from "apollo-server-express";
import {
   Arg,
   Authorized,
   Ctx,
   Field,
   Mutation,
   ObjectType,
   Query,
   Resolver,
} from "type-graphql";
import { destroySession } from "../../lib/destroy-session";
import { Roles } from "../helpers/roles";
import { User } from "../types/User";
import { createUser } from "./user/create-user";
import { login } from "./user/login";
import { queryAllUsers } from "./user/query-all-users";
import { queryMe } from "./user/query-me";
import { updatePassword, updateUsername } from "./user/update-user";

@ObjectType()
class Message {
   @Field()
   message: string;
}

@Resolver()
export class UserResolver {
   @Query(() => [User], { name: "users" })
   @Authorized([Roles.ADMIN])
   async users() {
      return queryAllUsers();
   }

   @Query(() => User)
   @Authorized()
   async me(@Ctx() { req }: ExpressContext) {
      return queryMe(req);
   }

   @Mutation(() => User)
   async createUser(
      @Arg("username") username: string,
      @Arg("password") password: string
   ) {
      return createUser(username, password);
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

   @Mutation(() => User, { description: "Update a user's username" })
   @Authorized()
   async updateUsername(
      @Arg("user_id") user_id: number,
      @Arg("username")
      username: string
   ) {
      return updateUsername(user_id, username);
   }

   @Mutation(() => User, { description: "Update a user's password" })
   @Authorized()
   async updatePassword(
      @Arg("user_id") user_id: number,
      @Arg("password") password: string
   ) {
      return updatePassword(user_id, password);
   }
}
