export const processVideo = async (job: any) => {
  console.log("Transcode worker is running...", job.data);

  let id: string | undefined;

  const url = process.env.ECS_CONTAINER_METADATA_URI_V4;

  if (url) {
    id = url.split("/").pop()?.split("-")[0];
    console.log("task id", id);
    // const container = await updateContainerStatus({
    //   id,
    //   status: "busy",
    // });

    // console.log(container);
  }
};
