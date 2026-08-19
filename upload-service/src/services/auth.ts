import { prisma } from "../lib/prisma.js";
import { googleClient } from "../services/google.js";
import { uploadGoogleProfileImage } from "../services/s3.js";
import { AppError } from "../utils/errorHandler.js";
import { generateAccessToken } from "../utils/jwt.js";

export const getGoogleAuthUrl = () => {
  return googleClient.generateAuthUrl({
    access_type: "offline",
    scope: ["openid", "email", "profile"],
  });
};

export const loginWithGoogle = async (code: string) => {
  const { tokens } = await googleClient.getToken(code);

  if (!tokens.id_token) {
    throw new AppError("Google did not return an ID token", 401, "fail");
  }

  const ticket = await googleClient.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload || !payload.email) {
    throw new AppError("Unable to verify Google token", 401, "fail");
  }

  const user = {
    googleId: payload.sub,
    email: payload.email,
    name: payload.name,
    avatar: payload.picture,
  };

  let dbUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        email: payload.email,
        name: payload.name || "",
      },
    });
    if (dbUser.email && payload.picture) {
      uploadGoogleProfileImage({ id: dbUser.id, url: payload.picture });
    }
  }

  const accessToken = generateAccessToken({
    id: dbUser.id,
  });

  return {
    user,
    accessToken,
  };
};
