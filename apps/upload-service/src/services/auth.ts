import { googleClient } from "@/services/google"
import { generateAccessToken } from "@/utils/jwt"
import { prisma } from "@workspace/db"

export const getGoogleAuthUrl = () => {
  return googleClient.generateAuthUrl({
    access_type: "offline",
    scope: ["openid", "email", "profile"],
  })
}

export const loginWithGoogle = async (code: string) => {
  const { tokens } = await googleClient.getToken(code)

  if (!tokens.id_token) {
    throw new Error("No id token")
  }

  const ticket = await googleClient.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  })

  const payload = ticket.getPayload()

  if (!payload?.email) {
    throw new Error("Invalid google token")
  }

  const user = {
    googleId: payload.sub,
    email: payload.email,
    name: payload.name,
    avatar: payload.picture,
  }

  let dbUser = await prisma.channel.findUnique({
    where: { email: payload.email },
  })

  if (!dbUser) {
    dbUser = await prisma.channel.create({
      data: {
        handle: payload.email.split("@")[0],
        email: payload.email,
        name: payload.name || "",
        description: "This is description",
        country: "India",
      },
    })
  }

  const accessToken = generateAccessToken({
    id: dbUser.id,
  })

  return {
    user,
    accessToken,
  }
}
