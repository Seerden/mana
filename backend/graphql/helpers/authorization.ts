import { ExpressContext, ForbiddenError } from "apollo-server-express";
import { AuthChecker } from "type-graphql";

const { ADMIN_USER_ID } = process.env;

export const authenticationChecker: AuthChecker<ExpressContext> = async (
   { args, context },
   _
) => {
   const { req } = context;

   const { userId } = req.session;
   const { user_id } = args;

   if (userId === +ADMIN_USER_ID) return true;

   if (!userId || !user_id || userId !== user_id)
      throw new ForbiddenError("User is not allowed to access this resource.");

   return true;
};
