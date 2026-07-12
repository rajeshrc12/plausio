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

  if (!payload) {
    throw new Error("Invalid google token")
  }

  const channel = {
    googleId: payload.sub,
    email: payload.email,
    name: payload.name,
    profileImage: payload.picture,
  }

  let dbChannel = await prisma.channel.findUnique({
    where: { email: payload.email },
  })

  if (!dbChannel) {
    dbChannel = await prisma.channel.create({
      data: {
        email: payload.email || "",
        name: payload.name || "",
        description: "This is description",
        profileImage: payload.picture,
        bannerImage: payload.picture,
        handle: payload?.email?.split("@")[0],
        country: "India",
      },
    })
  }

  const accessToken = generateAccessToken({
    id: dbChannel.id,
  })

  return {
    channel,
    accessToken,
  }
}
