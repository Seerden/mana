import { ExpressContext } from "apollo-server-express";
import { createParamDecorator } from "type-graphql";

export function UserId() {
   return createParamDecorator<ExpressContext>(({ context }) => {
      const { user_id } = context.req.session;

      if (!user_id) return; // TODO: Consider throwing an error again once we have proper global error handling client-side.

      return user_id;
   });
}
