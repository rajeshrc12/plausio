import "dotenv/config"
import { prisma } from "@workspace/db"
const run = async () => {
  const user = await prisma.user.findMany()
  console.log(user)
}
run()
