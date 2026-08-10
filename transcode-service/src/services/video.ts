export const processVideo = async (message: any) => {
  console.log("Transcode worker is running...");

  while (true) {
    // TODO: Get and process video jobs here

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
};
