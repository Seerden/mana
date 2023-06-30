import type { RecentSessions, SaturationLevel } from "./saturation.types";

/**
 * - maybe{Decrement/Increment} take a saturation level and one or more of the
 *    most recent review sessions for a term in a given direction, and check if the
 *    increment/decrement condition is met.
 * - saturateSeededTerm takes the most recent sessions for a term in a
 *    direction, and the current saturation level, and returns the term_id and
 *    the new saturation for the given direction. The new saturation is derived
 *    the decrement/increment conditions, combined with pre-set saturation delta
 *    (increment once = +1, decrement twice = -2, etc.)
 */

function maybeDecrementSaturationTwice(
   currentSaturation: SaturationLevel,
   { current }: RecentSessions
) {
   switch (currentSaturation) {
      case 0:
      case 1:
         return false;
      case 2:
      case 3:
      case 4:
         return current.session.failCount > 1;
      default:
         return false;
   }
}

function maybeDecrementSaturation(
   currentSaturation: SaturationLevel,
   { current }: RecentSessions
) {
   switch (currentSaturation) {
      case 0:
         return false;
      case 1:
         return current.session.failedFirst || current.session.failCount > 1;
      case 2:
         return !current.session.failedFirst && current.session.failCount === 1;
      case 3:
      case 4:
         return current.session.failCount === 1;
      default:
         return false;
   }
}

function maybeIncrementSaturation(
   currentSaturation: SaturationLevel,
   { current, previous, secondToLast }: RecentSessions
) {
   switch (currentSaturation) {
      case 0:
         return !current.session.failCount;
      case 1:
      case 3:
         return [current, previous, secondToLast].every((x) => !x.session.failCount);
      case 2:
         return [current, previous].every((x) => !x.session.failCount);
      default:
         return false;
   }
}

export function saturateSeededTerm(
   direction: "forwards" | "backwards",
   recentSessions: RecentSessions
): { term_id: number; forwards?: number; backwards?: number } {
   const currentSaturation = recentSessions.current.saturation?.[
      direction
   ] as SaturationLevel;

   // If the following occurs, we should be in `saturateUnseededTerm` instead.
   // TODO: trigger Sentry event.
   if (!currentSaturation) return;

   const delta =
      (maybeIncrementSaturation(currentSaturation, recentSessions) && 1) ||
      (maybeDecrementSaturation(currentSaturation, recentSessions) && -1) ||
      (maybeDecrementSaturationTwice(currentSaturation, recentSessions) && -2) ||
      0;

   return {
      term_id: recentSessions.current.term_id,
      [direction]: currentSaturation + delta,
   };
}

/** Export all operators for testing purposes. Should not be used outside of testing. */
export const seededSaturationDeltaOperators = {
   maybeIncrementSaturation,
   maybeDecrementSaturation,
   maybeDecrementSaturationTwice,
};
