import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { env } from "@/config/env"
import authRoutes from "@/routes/auth"
import userRoutes from "@/routes/user"

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
app.use("/user", userRoutes)

export default app
