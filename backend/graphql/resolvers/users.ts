import { Resolver, Query, Mutation, Arg, ObjectType, Field } from "type-graphql";
import { CUser, UserModel } from "../types/User.js";

@ObjectType()
class MaybeUser {
    @Field(() => String, { nullable: true })
    error?: String;

    @Field(() => CUser, { nullable: true })
    user?: CUser

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
}