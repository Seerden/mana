import { ExpressContext } from "apollo-server-express";
import { createParamDecorator } from "type-graphql";

export function UserId() {
   return createParamDecorator<ExpressContext>(({ context }) => {
      return context.req.session?.userId;
   });
}
