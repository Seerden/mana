import { ExpressContext, ForbiddenError } from "apollo-server-express";
import { AuthChecker } from "type-graphql";

const { ADMIN_USER_ID } = process.env;

export const authenticationChecker: AuthChecker<ExpressContext> = async (
   { args, context },
   _
) => {
   const { req } = context;

   const { user_id: sessionUserId } = req.session;
   const { user_id } = args;

   if (sessionUserId === +ADMIN_USER_ID) return true;

   if (!sessionUserId || !user_id || sessionUserId !== user_id)
      throw new ForbiddenError("User is not allowed to access this resource.");

   return true;
};
