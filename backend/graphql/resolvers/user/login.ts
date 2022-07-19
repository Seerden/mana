import { AuthenticationError, ExpressContext } from "apollo-server-express";
import { compare } from "bcryptjs";
import { sql } from "../../../db/init";
import { destroySession } from "../../../lib/destroy-session";
import { User } from "../../types/User";

export async function login(username: string, password: string, ctx: ExpressContext) {
   const { req } = ctx;

   const [user] = await sql<[User?]>`select * from users where username=${username}`;

   if (!user) {
      await destroySession(ctx);
      throw new AuthenticationError("Username doesn't exist");
   }

   const passwordMatches = await compare(password, user.password);

   if (passwordMatches) {
      req.session.user_id = user.user_id;
      return user;
   }

   destroySession(ctx);
   throw new AuthenticationError("Username and password do not match.");
}
