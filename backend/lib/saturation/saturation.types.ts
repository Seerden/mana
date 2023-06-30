/** Export a number of types related to saturation functionality. */

import { ReviewSessionEntry } from "../../graphql/types/ReviewSessionEntry";
import { Term, TermSaturation } from "../../graphql/types/Term";

// TODO: put this somewhere else;
export type SaturationLevel = 0 | 1 | 2 | 3 | 4;

// TODO: put this and PassFail somewhere else
enum PassFailEnum {
   PASS = "pass",
   FAIL = "fail",
}

export type PassFail = `${PassFailEnum}`;

export type ParsedSession = {
   /** PassFail values from the session. */
   passfail: PassFail[];
   /** Did the session start with a 'fail'?  */
   failedFirst: boolean;
   /** Number of fails in this session. */
   failCount?: number;
   /** Number of passes in this session. */
   passCount: number;
};

export type SessionEntriesWithMeta = {
   term_id: number;
   review_session_id: number;
   saturation: TermSaturation;
   session: ReviewSessionEntry[];
};

export type ParsedSessionWithMeta = Omit<SessionEntriesWithMeta, "session"> & {
   session: ParsedSession;
};

enum RecentSessionIdentifier {
   CURRENT = "current",
   PREVIOUS = "previous",
   SECONDTOLAST = "secondToLast",
}

export type RecentSessions = {
   [k in `${RecentSessionIdentifier}`]?: ParsedSessionWithMeta;
};

// TODO: should this be an ObjectType()?
// TODO: put this in Term typegraphql type definition file
export type TermWithResolvedFields = Term & {
   history: ReviewSessionEntry[];
   saturation: TermSaturation;
};
