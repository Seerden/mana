import "express-session";

declare namespace Express {
   interface Request {
      user: {
         username: string;
      };
   }
}

declare module "express-session" {
   interface Session {
      userId?: number;
   }
}
