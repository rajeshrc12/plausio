import { Request, Response } from "express";
import { getCpuContainers, updateCpuContainer } from "../services/container.js";

export const updateStatus = async (req: Request, res: Response) => {
  const { id, status, idleSince } = req.body;
  const response = await updateCpuContainer(id, { status, idleSince });
  res.status(201).json(response);
};
export const getAllCpuContainers = async (_req: Request, res: Response) => {
  const response = await getCpuContainers();
  res.status(200).json(response);
};
