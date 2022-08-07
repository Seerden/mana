import { seededSaturationDeltaOperators } from "./saturate-seeded";
import { ParsedSessionWithMeta } from "./saturation.types";

// TODO: create some more mock parsed sessions, e.g. 'flawless first', 'flawless
// three', 'only failed first', 'failed multiple', 'failed once but later'

const current: ParsedSessionWithMeta = {
   term_id: 1,
   review_session_id: 1,
   saturation: { term_id: 1, last_updated: 0, forwards: 1, backwards: null },
   session: {
      failedFirst: true,
      passCount: 1,
      failCount: 1,
      passfail: ["fail", "pass"],
   },
};

describe("seeded operators", () => {
   const inc = seededSaturationDeltaOperators.maybeIncrementSaturation;
   const dec = seededSaturationDeltaOperators.maybeDecrementSaturation;

   describe("from level 0", () => {
      it("does not increment level 0 if user failed at least once", () => {
         expect(inc(0, { current })).toBeFalsy();
      });

      it("does increment level 0 if user didn't fail", () => {
         const result = inc(0, {
            current: { ...current, session: { ...current.session, failCount: 0 } },
         });
         expect(result).toBe(true);
      });
   });

   describe("from level 1", () => {
      it("decrements if failed first try", () => {});
      it("decrements if failed multiple times", () => {});

      it("increments if didn't fail 3 sessions in a row", () => {});
   });

   describe("from level 2", () => {
      it("increments", () => {});

      it("decrements", () => {});
   });

   describe("from level 3", () => {
      it("increments", () => {});

      it("decrements", () => {});
   });

   describe("from level 4", () => {
      it("never increments", () => {
         expect(
            inc(4, {
               current: {
                  ...current,
                  session: {
                     ...current.session,
                     failedFirst: false,
                     failCount: 0,
                     passfail: ["pass"],
                  },
               },
            })
         ).toBeFalsy();
      });

      it("decrements", () => {
         expect(dec(4, { current: { session: { failCount: 1 } } as any })).toBeTruthy();
      });
   });
});
