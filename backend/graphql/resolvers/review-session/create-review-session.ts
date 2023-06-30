import { WithSQL } from "../../../custom_types/with-sql.types";
import { sql as instance } from "../../../db/init";
import { getNewSaturationLevels } from "../../../lib/saturation/saturate-after-session";
import { ReviewSession, ReviewSessionInput } from "../../types/ReviewSession";
import {
   EntryInputWithId,
   ReviewSessionEntry,
   ReviewSessionEntryInput,
} from "../../types/ReviewSessionEntry";
import { updateTermSaturation } from "../term/update-saturation";

export async function createReviewSession({
   sql = instance,
   session,
   entries,
}: WithSQL<{
   session: ReviewSessionInput;
   entries: ReviewSessionEntryInput[];
}>) {
   const [newSession, newEntries] = await sql.begin(async (sql) => {
      const [insertedSession] = await insertReviewSession({ sql, session });
      if (!insertedSession)
         throw new Error("Failed to insert review session into database");

      const insertedEntries = await createReviewSessionEntries({
         sql,
         entries: appendReviewIdToEntries(insertedSession.review_session_id, entries),
      });

      // TODO: update saturation
      const reviewedTermIds = Array.from(new Set(insertedEntries.map((x) => x.term_id)));

      const saturationUpdate = await getNewSaturationLevels(
         reviewedTermIds,
         insertedSession.direction as "forwards" | "backwards",
         sql
      );

      const updatedSaturation = await updateTermSaturation(saturationUpdate, sql);

      return [
         insertedSession,
         insertedEntries,
         updatedSaturation /* is returned, but not used yet elsewhere in this function */,
      ] as const;
   });

   return { session: newSession, entries: newEntries };
}

function appendReviewIdToEntries(
   review_session_id: number,
   entries: ReviewSessionEntryInput[]
): EntryInputWithId[] {
   return entries.map((entry) => ({
      ...entry,
      review_session_id: review_session_id,
   }));
}

async function insertReviewSession({
   sql = instance,
   session,
}: WithSQL<{ session: ReviewSessionInput }>) {
   return await sql<[ReviewSession?]>`insert into review_sessions ${sql(
      session as any
   )} returning *`;
}

async function createReviewSessionEntries({
   entries,
   sql = instance,
}: WithSQL<{ entries: EntryInputWithId[] }>) {
   const insertedEntries = await sql<
      [ReviewSessionEntry]
   >`insert into review_session_entries ${sql(entries)} returning *`;

   return insertedEntries;
}
