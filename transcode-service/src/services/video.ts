export interface TranscodeMessage {
  id: number;
  type: string;
}

export class TranscodeHandler {
  async handle(message: TranscodeMessage): Promise<void> {
    console.log(message);
  }
}
