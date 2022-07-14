import { UserInputError } from "apollo-server-express";
import { Request } from "express";
import { sql } from "../../../db/init";
import { User } from "../../types/User";

export async function queryMe(req: Request) {
   const { userId } = req?.session;

   if (!userId) {
      throw new Error("No active session.");
   }

   const users = await sql<[User?]>`select * from users where user_id = ${userId}`;

   if (!users?.length) {
      throw new UserInputError("User does not exist");
   }

   return users[0];
}
