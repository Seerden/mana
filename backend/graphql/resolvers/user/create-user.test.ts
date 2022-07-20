import { compare } from "bcryptjs";
import { sql } from "../../../db/init";
import { clearDatabaseData } from "../../../db/queries/clear-data";
import { resetSequences } from "../../../db/queries/reset-sequences";
import { User } from "../../types/User";
import { createUser } from "./create-user";

beforeAll(async () => {
   await resetSequences();
   await clearDatabaseData();
});

afterAll(async () => {
   await resetSequences();
   await clearDatabaseData();
});

describe("createUser", () => {
   it("insert a user", async () => {
      const data: Pick<User, "username" | "password"> = {
         password: "test_password",
         username: "test_user",
      };

      await sql.begin(async (sql) => {
         const user = await createUser({ sql, ...data });
         expect(user.username).toEqual("test_user");
         const passwordsMatch = await compare(data.password, user.password);
         expect(passwordsMatch).toBeTruthy();

         await sql`rollback`;
      });
   });
});
