import { sql } from "../../../db/init";
import { clearDatabaseData } from "../../../db/queries/clear-data";
import { resetSequences } from "../../../db/queries/reset-sequences";
import { createUser } from "./create-user";
import { deleteUser } from "./delete-user";
import { queryUser } from "./query-user";

beforeAll(async () => {
   await resetSequences();
   await clearDatabaseData();
});

afterAll(async () => {
   await resetSequences();
   await clearDatabaseData();
});

describe("deleteUser", () => {
   it("deletes created user", async () => {
      await sql.begin(async (q) => {
         const userData = {
            password: "pw",
            username: "to_delete",
         };

         // 1. Create user.
         const user = await createUser({ sql: q, ...userData });

         // 2. Delete just-created user.
         const deleted = await deleteUser({ sql: q, user_id: user.user_id });

         // 3. Check if deleted user matches expected deleted user.
         expect(deleted.user_id).toBe(1);
         expect(deleted.username).toBe(userData.username);

         // 4. Query deleted user, expecting it not to exist.
         const existingUser = await queryUser({ sql: q, username: userData.username });
         expect(existingUser).toBeUndefined();
      });
   });
});
