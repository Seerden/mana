import { hash } from "bcryptjs";
import { Error } from "postgres";
import { sql } from "../../../db/init";
import { User } from "../../types/User";

type Message = {
   message: string;
};

interface PostgresError extends Message {
   error: Error;
}

/**
 * Attempt to insert a new user into the database. If the username already
 * exists, return a Message.
 */
export async function createUser(username: string, password: string) {
   const hashedPassword = await hash(password, 10);

   const [existingUser] = await sql<[User?]>`select * from users where username = ${sql(
      username
   )}`;

   if (existingUser) {
      return { message: "Username already exists" } as Message;
   }

   const newUser: Omit<User, "user_id"> = {
      username,
      password: hashedPassword,
   };

   try {
      const [user] = await sql`insert into users ${sql(newUser)}`;
      return user as User;
   } catch (error) {
      return { message: "Error inserting user", error } as PostgresError;
   }
}
