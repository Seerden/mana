import { Request } from "express";
import { sql } from "../../../db/init";
import { User } from "../../types/User";

export async function queryMe(req: Request) {
   const { userId } = req?.session;

   if (!userId) {
      return { message: "No active session" };
   }

   const [user] = await sql<[User?]>`select * from users where user_id = ${userId}`;

   return user;
}
