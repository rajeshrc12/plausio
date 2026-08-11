import axios from "axios";
import { updateContainerStatus } from "./container.js";

export const processVideo = async (job: any) => {
  console.log("Transcode worker is running...", job.data);
  const container = await updateContainerStatus({
    id: "1",
    status: "busy",
  });
  console.log(container);
  if (process.env.ECS_CONTAINER_METADATA_URI_V4) {
    console.log(process.env.ECS_CONTAINER_METADATA_URI_V4);
    try {
      const response = await axios.get(
        `${process.env.ECS_CONTAINER_METADATA_URI_V4}/task`,
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }
};
