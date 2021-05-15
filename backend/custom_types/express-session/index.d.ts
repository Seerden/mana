import mongoose from 'mongoose';

declare namespace Express {
    interface Request {
        user: {
            username: string
        }
    }
}

declare module "express-session" {
    interface Session {
        userId?: mongoose.Schema.Types.ObjectId
    }
}