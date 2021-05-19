import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

declare namespace Express {
    interface Request {
        user: {
            username: string
        }
    }
}

declare module "express-session" {
    interface Session {
        userId?: ObjectId
    }
}