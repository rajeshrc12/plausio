import { NextFunction, Response, Request } from "express"

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public status: "fail" | "error" = "error"
  ) {
    super(message)

    Error.captureStackTrace(this, this.constructor)
  }
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err)
  res.status(err.statusCode ?? 500).json({
    status: err.status ?? "error",
    message: err.message,
  })
}
