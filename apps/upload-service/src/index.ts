import "dotenv/config"
import express from "express"
import { prisma } from "@workspace/db"
import { test } from "./app.js"
const app = express()

const port = Number(process.env.PORT ?? 3000)
test()
app.get("/", async (_, res) => {
  const users = await prisma.user.findMany()
  console.log(users)
  res.json(users)
})

app.get("/health", (_, res) => {
  res.send("ok")
})

app.listen(port, "0.0.0.0", () => {
  console.log(`Listening on ${port}`)
})
