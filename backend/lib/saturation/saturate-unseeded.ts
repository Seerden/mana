import { ParsedSessionWithMeta } from "./saturation.types";

/**
 * Assign an unseeded term a new saturation level.
 * @note Checking whether a term is seeded or unseeded, and whether an unseeded
 * term is ready to be assigned a saturation level, is done in
 * `getNewSaturationLevels()`
 */
export function saturateUnseededTerm({ current }: { current: ParsedSessionWithMeta }) {
   if (!current?.session.passfail.length) {
      // TODO: trigger Sentry event.
      return;
   }
   const { failCount } = current?.session;

   if (!failCount) return 2;
   if (failCount > 1) return 0;
   return 1;
}
