import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
