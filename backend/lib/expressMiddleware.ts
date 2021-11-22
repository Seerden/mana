import dayjs from "dayjs";
import { Response, Request } from "express";

/**
 * Express middleware to log every API call that is accessed
 */
export function log(req: Request, res: Response, next: (...args: any) => any) {
    if (!req.originalUrl.includes('graphql')) {
        console.log(`${dayjs(new Date()).format('MMM DD @ HH:mm')} - ${req.method} ${req.originalUrl}`);
    }

    next();
}