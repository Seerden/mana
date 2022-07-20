import { AuthenticationError, ExpressContext } from "apollo-server-express";
import { createParamDecorator } from "type-graphql";

export function UserId() {
   return createParamDecorator<ExpressContext>(({ context }) => {
      const { user_id } = context.req.session;

      if (!user_id) throw new AuthenticationError("No active session.");

      return user_id;
   });
}
