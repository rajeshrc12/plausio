import { Request, Response } from "express";
import { getCpuContainers, updateCpuContainer } from "../services/container.ts";

export const updateStatus = async (req: Request, res: Response) => {
  const { id, status } = req.body;
  const response = await updateCpuContainer(id, { status });
  res.status(201).json(response);
};
export const getAllCpuContainers = async (_req: Request, res: Response) => {
  const response = await getCpuContainers();
  res.status(200).json(response);
};
