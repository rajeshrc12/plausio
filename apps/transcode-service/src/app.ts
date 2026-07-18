import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { env } from "@/config/env"
import { errorHandler } from "@/utils/errorHandler"

const app = express()

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  })
)

app.use(express.json())
app.use(cookieParser())

app.use(errorHandler)

export default app
