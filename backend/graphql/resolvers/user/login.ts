import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { sql } from "../../../db/init";
import { User } from "../../types/User";

export async function login(
   username: string,
   password: string,
   { req, res }: { req: Request; res: Response }
) {
   const [user] = await sql<
      [User?]
   >`select * from users where username=${username} and password=${password}`;

   if (!user) {
      res.clearCookie("mana-session");
      req.session.destroy(null);
      // TODO: type this error
      return { error: "Username does not exist" };
   }

   const passwordMatches = await compare(password, user.password);

   if (passwordMatches) {
      // TODO: re-type session.userId to be a number instead of an ObjectId
      req.session.userId = user.user_id;
      return { user: user };
   } else {
      res.clearCookie("mana-session");
      req.session.destroy(null);
      // TODO: type this error
      return { error: "Invalid credentials" };
   }
}
