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

  private async poll(handler: (message: T) => Promise<void>): Promise<void> {
    console.log("SQS Started");
    while (this.running) {
      try {
        const response = await this.sqs.send(
          new ReceiveMessageCommand({
            QueueUrl: this.queueUrl,
            MaxNumberOfMessages: 1,
            WaitTimeSeconds: 20,
            VisibilityTimeout: 60,
          }),
        );

        const message = response.Messages?.[0];

        if (!message) {
          continue;
        }

        try {
          if (!message.Body) {
            console.error("Received SQS message without a body");
            continue;
          }

          const parsedMessage = JSON.parse(message.Body) as T;

          await handler(parsedMessage);

          if (message.ReceiptHandle) {
            await this.sqs.send(
              new DeleteMessageCommand({
                QueueUrl: this.queueUrl,
                ReceiptHandle: message.ReceiptHandle,
              }),
            );
          }
        } catch (err) {
          console.error("Message processing failed", err);
          // Message is NOT deleted.
          // SQS can make it visible again after VisibilityTimeout.
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
