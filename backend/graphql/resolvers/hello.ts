import { Resolver, Query } from "type-graphql";
import { CUser, UserModel } from "../types/User.js";

@Resolver()
export class HelloResolver {
    @Query(() => String)
    async helloWorld() {
        return "Hey"
    }
}