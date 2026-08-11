export const processVideo = async (job: any) => {
  console.log("Transcode worker is running...", job.data);
  if (process.env.ECS_CONTAINER_METADATA_URI_V4) {
    console.log(process.env.ECS_CONTAINER_METADATA_URI_V4);
    try {
      const response = await fetch(
        `${process.env.ECS_CONTAINER_METADATA_URI_V4}/task`,
      );

      const metadata = await response.json();

      console.log(metadata.TaskARN);
    } catch (e) {
      console.log(e);
    }
  }
};
