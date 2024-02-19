import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import FailResponse from "../utils/FailResponse";
import ErrorWithCode from "../errors/ErrorWithCode";
import { JWTErrors } from "../enums";
import { TUser } from "../types";

declare global {
  namespace Express {
    interface Request {
      user?: Omit<TUser, "password">;
    }
  }
}

export default async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  await FailResponse(res, async () => {
    const { path, method: reqMethod } = req;
    const skipAuth = NO_AUTH_ROUTES.some(
      ({ route, method }) => path == route && method == reqMethod
    );
    if (skipAuth) return next();

    const { headers } = req;
    const authHeader = headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
      throw new ErrorWithCode(401, "Access denied. Invalid credentials");

    jwt.verify(
      token,
      process.env.JWT_SECRET_TOKEN as string,
      (error, decoded) => {
        if (error) {
          return res.sendStatus(
            error.message == JWTErrors.TokenExpiredError ? 403 : 401
          );
        }

        req.user = decoded as Omit<TUser, "password">;

        next();
      }
    );
  });
}

type TNO_AUTH_ROUTE = { route: string; method: string };
const NO_AUTH_ROUTES: TNO_AUTH_ROUTE[] = [
  { route: "/register", method: "POST" },
  { route: "/login", method: "POST" },
];
