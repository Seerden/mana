import { sql, testSql } from "./init";

describe("database initialization", () => {
   it("connects to actual database", async () => {
      const [response] = await sql`select jsonb_agg(1) value`;
      expect(response.value).toEqual([1]);
   });

   it("connects to test database", async () => {
      const [response] = await testSql`select jsonb_agg(1) value`;
      expect(response.value).toEqual([1]);
   });
});
