import { ExpressContext } from "apollo-server-express";
import { createMethodDecorator, MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<ExpressContext> = ({ args, context }, next) => {
    const loggedInUser = context.req.user?.username;
    const userMakingRequest = args.username;

    if (!loggedInUser || !userMakingRequest || (loggedInUser && loggedInUser !== userMakingRequest)) {
        throw new Error('Not authenticated')
    } else {
        return next()
    }
}

export function authenticate() {
    return createMethodDecorator<ExpressContext>((context, next) => {
        return isAuth(context, next);
    })
}