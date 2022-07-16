import { resetSequences } from "./reset-sequences";

describe("sequence reset", () => {
   it("resets all sequences", async () => {
      const response = await resetSequences();
      expect(response).not.toHaveLength(0);
   });
});
