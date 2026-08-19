import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { generateAdminAccessToken } from "../utils/jwt.js";
import { Admin } from "../../generated/prisma/client.js";

export const login = async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  const admin = await prisma.admin.findFirst({ where: { userName, password } });
  if (admin) {
    const accessToken = generateAdminAccessToken({
      id: admin.id,
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ message: "ok" });
    return;
  }
  res.status(401).json({ message: "Invalid username or password" });
};

export const getMe = async (req: Request, res: Response) => {
  const admin = req.admin as Admin;
  const me = await prisma.admin.findFirst({ where: { id: admin.id } });

  res.status(200).json(me);
};
