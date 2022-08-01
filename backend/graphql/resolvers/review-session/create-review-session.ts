import { sql } from "../../../db/init";
import { ReviewSession, ReviewSessionInput } from "../../types/ReviewSession";
import {
   ReviewSessionEntry,
   ReviewSessionEntryInput,
} from "../../types/ReviewSessionEntry";

type EntryInputWithId = ReviewSessionEntryInput & {
   review_session_id: ReviewSession["review_session_id"];
};

export async function createReviewSession(
   session: ReviewSessionInput,
   entries: ReviewSessionEntryInput[]
) {
   const [newSession, newEntries] = await sql.begin(async (sql) => {
      const [insertedSession] = await sql<
         [ReviewSession?]
      >`insert into review_sessions ${sql(session as any)} returning *`;

      if (!insertedSession)
         throw new Error("Failed to insert review session into database");

      const reviewId = insertedSession.review_session_id;

      const entriesWithId: EntryInputWithId[] = entries.map((entry) => ({
         ...entry,
         review_session_id: reviewId,
      }));

      const insertedEntries = await createReviewSessionEntries(entriesWithId);

      return [insertedSession, insertedEntries] as const;
   });

   return { session: newSession, entries: newEntries };
}

async function createReviewSessionEntries(entries: EntryInputWithId[]) {
   const insertedEntries = await sql<
      [ReviewSessionEntry]
   >`insert into review_session_entries ${sql(entries)} returning *`;

   return insertedEntries;
}
