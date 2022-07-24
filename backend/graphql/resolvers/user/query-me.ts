import { ExpressContext, UserInputError } from "apollo-server-express";
import { sql } from "../../../db/init";
import { destroySession } from "../../../lib/destroy-session";
import { User } from "../../types/User";

export async function queryMe(user_id: number, ctx: ExpressContext) {
   if (!user_id) {
      return;
   }

   const users = await sql<[User?]>`select * from users where user_id = ${user_id}`;

   if (!users?.length) {
      destroySession(ctx);
      throw new UserInputError("User does not exist");
   }

   return users[0];
}
