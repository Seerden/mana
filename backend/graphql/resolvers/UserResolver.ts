// @ts-nocheck

import { ExpressContext } from "apollo-server-express";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { User } from "../types/User";
import { createUser } from "./user/create-user";
import { login } from "./user/login";
import { queryAllUsers } from "./user/query-all-users";
import { queryMe } from "./user/query-me";

@ObjectType()
class MaybeUser {
   @Field({ nullable: true })
   error?: string;

   @Field(() => User, { nullable: true })
   user?: User;
}

@Resolver()
export class UserResolver {
   @Query(() => [User], { name: "users" })
   async users() {
      return await queryAllUsers();
   }

   @Query(() => MaybeUser)
   async me(@Ctx() { req }: ExpressContext) {
      return await queryMe(req);
   }

   @Mutation(() => MaybeUser)
   async createUser(
      @Arg("username") username: string,
      @Arg("password") password: string
   ): Promise<MaybeUser> {
      return await createUser(username, password);
   }

   @Mutation(() => MaybeUser)
   async login(
      @Arg("username") username: string,
      @Arg("password") password: string,
      @Ctx() { req, res }: ExpressContext
   ): Promise<MaybeUser> {
      return await login(username, password, { req, res });
   }
}
