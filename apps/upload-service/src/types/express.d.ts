import { JwtPayload } from "jsonwebtoken"

declare global {
  namespace Express {
    interface Request {
      channel: string | JwtPayload
    }
  }
}
