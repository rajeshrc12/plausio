import { promisify } from "node:util";
import { execFile } from "node:child_process";
import { languages } from "./option.js";

const execFileAsync = promisify(execFile);

type AudioStream = {
  index: number;
  codecName?: string;
  channels?: number;
  channelLayout?: string;
  language?: string;
  languageName?: string;
  title?: string;
};

export const getAudioStreams = async (
  inputFile: string,
): Promise<AudioStream[]> => {
  const { stdout } = await execFileAsync("ffprobe", [
    "-v",
    "error",
    "-select_streams",
    "a",
    "-show_entries",
    "stream=index,codec_name,channels,channel_layout:stream_tags=language,title",
    "-of",
    "json",
    inputFile,
  ]);

  const result = JSON.parse(stdout);

  return (result.streams ?? []).map((stream: any) => {
    const language = stream.tags?.language?.toLowerCase();

    return {
      index: stream.index,
      codecName: stream.codec_name,
      channels: stream.channels,
      channelLayout: stream.channel_layout,
      language,
      languageName: languages[language] ?? language ?? "Unknown",
      title: stream.tags?.title,
    };
  });
};
