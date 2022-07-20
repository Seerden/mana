import { UserInputError } from "apollo-server-express";
import { sql } from "../../../db/init";
import { User } from "../../types/User";

export async function queryMe(user_id: number) {
   if (!user_id) {
      throw new Error("No active session.");
   }

   const users = await sql<[User?]>`select * from users where user_id = ${user_id}`;

   if (!users?.length) {
      throw new UserInputError("User does not exist");
   }

   return users[0];
}
