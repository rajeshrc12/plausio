import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { env } from "@/config/env"
import authRoutes from "@/routes/auth"

const app = express()

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  })
)

app.use(express.json())
app.use(cookieParser())

app.use("/auth", authRoutes)

export default app
