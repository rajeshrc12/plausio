import { uploadQueue } from "./config/bullmq.js";

const addJob = async () => {
  const response = await uploadQueue.add("process-upload", {
    fileId: "123",
    filePath: "/uploads/file.pdf",
  });
  console.log(response.data);
};
addJob();
