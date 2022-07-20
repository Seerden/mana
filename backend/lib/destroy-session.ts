import { ExpressContext } from "apollo-server-express";

// TODO: probably best to extract this to an environment variable, or at least
// a variable.
const sessionString = "mana-session";

export async function destroySession({ req, res }: ExpressContext) {
   try {
      if (!req.session?.user_id) {
         return { message: "Already logged out." };
      }

      res.clearCookie(sessionString);
      req.session.destroy(null);

      if (!req.session?.user_id) {
         return { message: "Logged out" };
      }
   } catch (error) {
      throw new Error(error);
   }
}
