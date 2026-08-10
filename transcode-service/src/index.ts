import { processVideo } from "./services/video.js";

async function main() {
  console.log("Transcode worker starting...");

  try {
    await processVideo({});
  } catch (error) {
    console.error("Failed to process message:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Worker failed:", error);
  process.exit(1);
});
