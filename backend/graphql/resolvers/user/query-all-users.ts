// @ts-nocheck

import { sql } from "../../../db/init";
import { User } from "../../types/User";

export async function queryAllUsers() {
   const users = await sql<[User?]>`select * from users`;

   return users;
}
