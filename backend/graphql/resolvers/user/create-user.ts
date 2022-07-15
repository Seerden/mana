import {} from "apollo-server-express";
import { hash } from "bcryptjs";
import { sql } from "../../../db/init";
import { User } from "../../types/User";

/** Insert a new user into the database. Throw if username already taken. */
export async function createUser(username: string, password: string) {
   const hashedPassword = await hash(password, 10);

   // NOTE: we'll use this more often, elsewhere: sql(condition) resolves to "username"=$1, with $1=username
   const condition = { username };

   const [existingUser] = await sql<[User?]>`select * from users where ${sql(condition)}`;

   if (existingUser) {
      throw new Error("Username already taken.");
   }

   const newUser: Omit<User, "user_id" | "created_at"> = {
      username,
      password: hashedPassword,
   };

   const [user] = await sql<[User?]>`insert into users ${sql(newUser)} returning *`;
   return user;
}
