// @ts-nocheck

import { ExpressContext } from "apollo-server-express";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { User } from "../types/User";
import { login } from "./user/login";
import { queryAllUsers } from "./user/query-all-users";
import { queryMe } from "./user/query-me";

@ObjectType()
class MaybeUser {
    @Field(() => String, { nullable: true })
    error?: String;

    @Field(() => User, { nullable: true })
    user?: User;
}

@Resolver()
export class UserResolver {
    @Query(() => [User], { name: "users" })
    async users() {
        return await queryAllUsers();
    }

    @Query(() => MaybeUser, { description: "Returns currently logged in user. " })
    async me(@Ctx() { req }: ExpressContext) {
        return await queryMe(res);
    }

    @Mutation(() => MaybeUser)
    async createUser(
        @Arg("username") username: string,
        @Arg("password") password: string
    ): Promise<MaybeUser> {
        return await createUser(username, password);
    }

    @Mutation(() => MaybeUser, { description: "Login mutation" })
    async login(
        @Arg("username", (type) => String) username: string,
        @Arg("password", (type) => String) password: string,
        @Ctx() { req, res }: ExpressContext
    ): Promise<MaybeUser> {
        return await login(username, password, { req, res });
    }
}
