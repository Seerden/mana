import { Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx } from "type-graphql";
import { CUser, UserModel } from "../types/User.js";
import passport from '../../auth/passport.js';
import { ExpressContext } from "apollo-server-express";

@ObjectType()
class MaybeUser {
    @Field(() => String, { nullable: true })
    error?: String;

    @Field(() => CUser, { nullable: true })
    user?: CUser
}

@ObjectType()
class LoginResponse {
    @Field(() => String, { nullable: true })
    error?: String;

    @Field(() => CUser, { nullable: true })
    user?: Partial<CUser>
}

@Resolver()
export class UsersResolver {
    @Query(() => CUser, { name: "users" })
    async users(){
        return await UserModel.find({})
    }

    @Mutation(() => MaybeUser)
    async createUser(
        @Arg("username") username: string,
        @Arg("password") password: string
    ): Promise<MaybeUser> {
        const newUser = new UserModel({
            username,
            password
        })

        const existingUser = await UserModel.findOne({ username });
        if (!existingUser) {
            return { user: await newUser.save() }
        }

        return { error: 'Username already exists ' }
    }

    @Mutation(() => MaybeUser)
    async login(
        @Arg("username") username: string,
        @Arg("password") password: string,
        @Ctx() ctx: ExpressContext
    ): Promise<LoginResponse>{
        console.log(Object.keys(ctx));
        
        await passport.authenticate("local");
        if (ctx.req.isAuthenticated()) {
            return { user: ctx.req.user }
        } else {
            return { error: "Authentication failed"}
        }

    }
}