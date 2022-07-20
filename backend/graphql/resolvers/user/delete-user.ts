import { sql as instance, SQL } from "../../../db/init";
import { User } from "../../types/User";

type Options = {
   sql?: SQL;
   user_id: number;
};

export async function deleteUser({ sql = instance, user_id }: Options) {
   const [user] = await sql<
      [User?]
   >`delete from users where user_id = ${user_id} returning *`;
   return user;
}
