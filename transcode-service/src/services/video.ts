import { updateContainerStatus } from "./container.ts";
const delay = (second: number) =>
  new Promise((resolve) => setTimeout(resolve, second * 1000));

export const processVideo = async (job: any) => {
  console.log("Transcode worker is running...", job.data);

  let id: string | undefined;

  const url = process.env.ECS_CONTAINER_METADATA_URI_V4;

  if (url) {
    id = url.split("/").pop()?.split("-")[0];
    console.log("task id", id);
    console.log("Worker running");
    updateContainerStatus({
      id,
      status: "busy",
    });
    await delay(5);
    updateContainerStatus({
      id,
      status: "idle",
    });
    console.log("Worker finished");
  }
};
