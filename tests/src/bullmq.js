import { uploadQueue } from "./config/bullmq.js";

const addJob = async () => {
  const response = await uploadQueue.add("transcode", {
    id: Math.floor(Math.random() * 1000),
    type: "video/mp4",
  });
  console.log(response.data);
};
addJob();
