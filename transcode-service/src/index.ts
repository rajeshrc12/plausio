import { TranscodeHandler, TranscodeMessage } from "./services/video.js";
import { env } from "./config/env.js";
import { SqsConsumer } from "./services/sqs.js";
import { sqs } from "./config/sqs.js";

async function bootstrap() {
  const handler = new TranscodeHandler();

  const consumer = new SqsConsumer<TranscodeMessage>(sqs, env.AWS_SQS_URL);

  consumer.start((message) => handler.handle(message));

  const shutdown = async () => {
    console.log("Shutting down...");
    consumer.stop();
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
