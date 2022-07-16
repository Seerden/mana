import { sql as instance, SQL } from "../../../db/init";

type Options = {
   sql?: SQL;
   user_id: number;
};

export async function deleteUser({ sql = instance, user_id }: Options) {
   await sql`delete from users where user_id = ${user_id} returning *`;
}
