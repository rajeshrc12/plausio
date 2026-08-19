import axios from "axios";
import { env } from "../config/env.js";

export const updateContainerStatus = async ({
  id,
  status,
  idleSince,
}: {
  id: string | undefined;
  status: string;
  idleSince: string | null;
}) => {
  const container = await axios.patch(
    `${env.UPLOAD_SERVICE_API_URL}/api/redis/status`,
    { id, status, idleSince },
  );
  return container.data;
};

export const getAllContainers = async () => {
  const container = await axios.get(`${env.UPLOAD_SERVICE_API_URL}/api/redis`);
  return container.data;
};
