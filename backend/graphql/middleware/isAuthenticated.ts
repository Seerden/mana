import { ExpressContext } from "apollo-server-express";
import { createMethodDecorator, MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<ExpressContext> = ({ args, context }, next) => {
   const loggedInUser = context.req.session.userId;
   const userMakingRequest = args.username;

   if (
      !loggedInUser ||
      !userMakingRequest ||
      (loggedInUser && loggedInUser !== userMakingRequest)
   ) {
      throw new Error("Not authenticated");
   } else {
      return next();
   }
};

export function authenticated() {
   return createMethodDecorator<ExpressContext>((context, next) => {
      return isAuth(context, next);
   });
}
