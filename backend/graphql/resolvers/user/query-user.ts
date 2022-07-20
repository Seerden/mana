import { UserInputError } from "apollo-server-express";
import { SQL } from "../../../db/init";
import { User } from "../../types/User";

type Options = {
   sql: SQL;
   username?: string;
   user_id?: number;
};

export async function queryUser({ sql, username, user_id }: Options) {
   if (!username && !user_id) throw new UserInputError("Need username or user_id");

   const [user] = await sql<[User?]>`select from users where ${
      username ? sql`username=${username}` : sql`user_id=${user_id}`
   }`;

   return user;
}
