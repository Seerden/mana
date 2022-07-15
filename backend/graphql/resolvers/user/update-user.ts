import { AuthenticationError, UserInputError } from "apollo-server-express";
import { compare, hash } from "bcryptjs";
import { sql } from "../../../db/init";
import { User } from "../../types/User";

async function verifyPassword(user_id: number, password: string) {
   const [user] = await sql<[User?]>`select * from users where user_id=${user_id}`;

   return compare(password, user.password);
}

/** Update a user's password. */
export async function updatePassword(
   user_id: number,
   currentPassword: string,
   newPassword: string
) {
   if (!newPassword?.length) throw new UserInputError("No password supplied");

   if (!(await verifyPassword(user_id, currentPassword)))
      throw new Error("Password does not match database record.");

   const update = {
      password: await hash(newPassword, 10),
   };

   const [user] = await sql<[User?]>`update users set ${sql(
      update
   )} where user_id=${user_id} returning *`;

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

   const [user] = await sql<[User?]>`update users set ${sql(
      update
   )} where user_id=${user_id} returning *`;

   return user;
}
