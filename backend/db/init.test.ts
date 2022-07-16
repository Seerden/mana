import { config } from "dotenv";
import { sql } from "./init";
config();

describe("database initialization", () => {
   it("connects to test database", async () => {
      const [response] = await sql`select jsonb_agg(1) value`;
      expect(response.value).toEqual([1]);
   });
});
