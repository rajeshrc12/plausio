import { updateContainerStatus } from "./container.js";
import { worker } from "./transcode.js";

export const processVideo = async (job: any) => {
  console.log("Transcode worker is running...", job.data);
  try {
    let id: string | undefined;

    const url = process.env.ECS_CONTAINER_METADATA_URI_V4;

    if (url) {
      id = url.split("/").pop()?.split("-")[0];
      console.log("task id", id);
      await updateContainerStatus({
        id,
        status: "busy",
        idleSince: null,
      });
      await worker(job.data);
      await updateContainerStatus({
        id,
        status: "idle",
        idleSince: new Date().toISOString(),
      });
      console.log("Worker finished");
    }
  } catch (e) {
    console.log("error while transcoding video", e);
  }
};
