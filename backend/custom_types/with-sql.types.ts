import { SQL } from "../db/init";

/**
 * Adds optional `sql` property to type T.
 *
 * @usage Functions that interact with the database need to take an sql
 * instance, since otherwise transactions don't work (because function calls
 * inside them will otherwise use the wrong sql instance, and then we get nested
 * transactions -- not good).
 */
export type WithSQL<T> = T & { sql?: SQL };
