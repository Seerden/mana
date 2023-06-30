import { saturateUnseededTerm } from "./saturate-unseeded";
import { PassFail } from "./saturation.types";

const shouldBe2 = {
   current: {
      review_session_id: 1,
      saturation: { term_id: 1, last_updated: 0, backwards: null, forwards: null },
      session: {
         failedFirst: false,
         passCount: 1,
         failCount: 0,
         passfail: ["pass"] as PassFail[],
      },
      term_id: 1,
   },
};

const shouldBe1 = structuredClone(shouldBe2);
shouldBe1.current.session.failCount = 1;

const shouldBe0 = structuredClone(shouldBe2);
shouldBe0.current.session.failCount = 2;

const shouldBeUndefined = structuredClone(shouldBe2);
shouldBeUndefined.current = null;

describe("saturateUnseededTerm", () => {
   it("returns undefined if no sessions provided", () => {
      expect(saturateUnseededTerm(shouldBeUndefined)).toBeUndefined();
   });

   it("returns correct values", () => {
      expect(saturateUnseededTerm(shouldBe2)).toEqual(2);
      expect(saturateUnseededTerm(shouldBe1)).toEqual(1);
      expect(saturateUnseededTerm(shouldBe0)).toEqual(0);
   });
});
