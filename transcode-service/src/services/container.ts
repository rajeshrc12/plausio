import axios from "axios";
import { env } from "../config/env.js";

export const updateContainerStatus = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  const container = await axios.get(`${env.UPLOAD_SERVICE_API_URL}/api/redis`);
  return container.data;
};
