import dayjs from "dayjs";
import { Request, Response } from "express";

/**
 * Express middleware to log every API request
 */
export function log(req: Request, res: Response, next: (...args: any) => any) {
    if (!req.originalUrl.includes("graphql")) {
        console.log(
            `${dayjs(new Date()).format("MMM DD @ HH:mm")} - ${req.method} ${
                req.originalUrl
            }`
        );
    }

    next();
}
