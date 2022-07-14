import { AuthenticationError, UserInputError } from "apollo-server-express";
import { hash } from "bcryptjs";
import { sql } from "../../../db/init";
import { User } from "../../types/User";

/**
 * Update a user's password.
 */
export async function updatePassword(user_id: number, password: string) {
   if (!password?.length) throw new UserInputError("No password supplied");

   const update = {
      password: await hash(password, 10),
   };
   const condition = { user_id };

   const [user] = await sql<[User?]>`update users set ${sql(update)} where ${sql(
      condition
   )} returning *`;

   return user;
}

/**
 * Attempt to update a user's username. If the new username is already taken,
 * throw an error.
 */
export async function updateUsername(user_id: number, username: string) {
   const [existingUser] = await sql<
      [User?]
   >`select * from users where username=${username}`;

   if (existingUser) throw new AuthenticationError("Username already taken.");

   if (!username?.length) throw new UserInputError("No username supplied.");

   const update = { username };
   const condition = { user_id };

   const [user] = await sql<[User?]>`update users set ${sql(update)} where ${sql(
      condition
   )} returning *`;

   return user;
}
