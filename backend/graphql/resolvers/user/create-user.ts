import { hash } from "bcryptjs";
import { sql as instance, SQL } from "../../../db/init";
import { User } from "../../types/User";

type Options = {
   sql?: SQL;
   username: User["username"];
   password: User["password"];
};

/** Insert a new user into the database. Throw if username already taken. */
export async function createUser({ sql = instance, username, password }: Options) {
   const [existingUser] = await sql<
      [User?]
   >`select * from users where username=${username}`;

   if (existingUser) {
      throw new Error(`Username already taken: ${existingUser.user_id}`);
   }

   const newUser: Omit<User, "user_id" | "created_at"> = {
      username,
      password: await hash(password, 10),
   };

   const [user] = await sql<[User?]>`insert into users ${sql(newUser)} returning *`;
   return user;
}
