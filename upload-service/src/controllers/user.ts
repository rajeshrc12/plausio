import { Request, Response } from "express";
import { User } from "../../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";

export const getMe = async (req: Request, res: Response) => {
  const user = req.user as User;
  const me = await prisma.user.findFirst({ where: { id: user.id } });
  res.status(200).json(me);
};
