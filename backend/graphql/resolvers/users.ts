import { Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx } from "type-graphql";
import { User, UserModel } from "../types/User";
import passport from '../../auth/passport';
import { ExpressContext } from "apollo-server-express";

@ObjectType()
class MaybeUser {
    @Field(() => String, { nullable: true })
    error?: String;

    @Field(() => User, { nullable: true })
    user?: User
}

@ObjectType()
class LoginResponse {
    @Field(() => String, { nullable: true })
    error?: String;

    @Field(() => User, { nullable: true })
    user?: Partial<User>
}

@Resolver()
export class UsersResolver {
    @Query(() => [User], { name: "users" })
    async users() {
        return await UserModel.find()
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
}