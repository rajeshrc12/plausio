import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { env } from "../config/env.js";
import { AppError } from "./errorHandler.js";

export const authenticateToken = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.accessToken;
  console.log(req.cookies);
  if (!token) {
    throw new AppError("Token missing", 401, "fail");
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.channel = decoded;
    next();
  } catch {
    throw new AppError("Invalid or expired token", 401, "fail");
  }
};
