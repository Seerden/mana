import { Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx } from "type-graphql";
import { User, UserModel } from "../types/User";
import { ExpressContext } from "apollo-server-express";
import { compare } from "bcryptjs";

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
export class UserResolver {
    @Query(() => [User], { name: "users" })
    async users() {
        return await UserModel.find()
    }

    @Query(() => MaybeUser, { description: "Returns currently logged in user. "})
    async me(
        @Ctx() { req }: ExpressContext
    ) {
        if (req.session.userId) {
            return { user: UserModel.findById(req.session.userId) }
        } return { error: "No active session" }
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

    @Mutation(() => MaybeUser, { description: "Login mutation"} )
    async login(
        @Arg("username", type => String) username: string,
        @Arg("password", type => String) password: string,
        @Ctx() { req, res }: ExpressContext
    ): Promise<MaybeUser> {
        const foundUser = await UserModel.findOne({ username });

        if (foundUser) {
            const passwordMatches = await compare(password, foundUser.password);
            
            if (passwordMatches) {
                req.session.userId = foundUser._id;
                return { user: foundUser }
            } else {
                res.clearCookie("mana-session");
                req.session.destroy(null);
                return { error: 'Invalid credentials'}
            }
        } else {
            res.clearCookie("mana-session");
            req.session.destroy(null);
            return { error: 'Username does not exist'}
        }
    }
}