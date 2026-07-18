export interface TranscodeMessage {
  id: number
  key: string
  type: string
}

export class TranscodeHandler {
  async handle(message: TranscodeMessage): Promise<void> {
    console.log("Transcoding:", message)

    // 1. Download video
    // 2. Run ffmpeg
    // 3. Upload output
    // 4. Update DB
  }
}
