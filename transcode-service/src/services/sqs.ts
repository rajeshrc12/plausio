import {
  DeleteMessageCommand,
  ReceiveMessageCommand,
  SQSClient,
} from "@aws-sdk/client-sqs";

export class SqsConsumer<T> {
  private running = false;

  constructor(
    private readonly sqs: SQSClient,
    private readonly queueUrl: string,
  ) {}

  start(handler: (message: T) => Promise<void>): void {
    if (this.running) return;

    this.running = true;
    void this.poll(handler);
  }

  stop(): void {
    this.running = false;
  }

  private async poll(handler: (message: T) => Promise<void>) {
    while (this.running) {
      try {
        const response = await this.sqs.send(
          new ReceiveMessageCommand({
            QueueUrl: this.queueUrl,
            MaxNumberOfMessages: 10,
            WaitTimeSeconds: 20,
            VisibilityTimeout: 60,
          }),
        );

        for (const message of response.Messages ?? []) {
          try {
            await handler(JSON.parse(message.Body!) as T);

            await this.sqs.send(
              new DeleteMessageCommand({
                QueueUrl: this.queueUrl,
                ReceiptHandle: message.ReceiptHandle!,
              }),
            );
          } catch (err) {
            console.error("Message processing failed", err);
          }
        }
      } catch (err) {
        if (this.running) {
          console.error("Polling error", err);
        }
      }
    }

    console.log("SQS consumer stopped.");
  }
}
