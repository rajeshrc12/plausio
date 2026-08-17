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

export interface VideoInfo {
  fps: number;
  bitrate: number;
}

export async function getVideoInfo(inputPath: string) {
  const { stdout } = await execFileAsync("ffprobe", [
    "-v",
    "error",
    "-select_streams",
    "v:0",
    "-show_entries",
    "stream=r_frame_rate,bit_rate:format=bit_rate",
    "-of",
    "json",
    inputPath,
  ]);

  const data = JSON.parse(stdout);
  const stream = data.streams?.[0];

  const frameRate = stream?.r_frame_rate;

  if (!frameRate) {
    throw new Error("Could not determine video FPS");
  }

  const [numerator, denominator] = frameRate.split("/").map(Number);

  if (!numerator || !denominator) {
    throw new Error(`Invalid frame rate: ${frameRate}`);
  }

  const fps = numerator / denominator;

  const bitRate = Number(stream?.bit_rate ?? data.format?.bit_rate);

  if (!Number.isFinite(bitRate)) {
    throw new Error("Could not determine video bitrate");
  }

  return {
    fps,
    bitRate, // bits per second
    bitRateKbps: bitRate / 1000,
  };
}

type HlsVariant = {
  name: string;
  height: number;
  width: number;
  bitrate: string;
  maxrate: string;
  bufsize: string;
};

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

const formatBitrate = (bitrate: number): string => {
  return `${Math.round(bitrate / 1000)}k`;
};

export const createHlsVariants = (
  fps: number,
  bitRate: number,
  segmentDuration: number,
) => {
  const gop = Math.round(fps * segmentDuration);

  // Keep the generated bitrate within sensible limits.
  const bitrate720 = clamp(
    bitRate,
    400_000, // minimum 400 kbps
    3_000_000, // maximum 3 Mbps
  );

  const bitrate480 = clamp(
    bitRate * 0.65,
    250_000, // minimum 250 kbps
    1_500_000, // maximum 1.5 Mbps
  );

  const variants: HlsVariant[] = [
    {
      name: "720p",
      height: 720,
      width: 1280,
      bitrate: formatBitrate(bitrate720),
      maxrate: formatBitrate(bitrate720 * 1.1),
      bufsize: formatBitrate(bitrate720 * 2),
    },
    {
      name: "480p",
      height: 480,
      width: 854,
      bitrate: formatBitrate(bitrate480),
      maxrate: formatBitrate(bitrate480 * 1.1),
      bufsize: formatBitrate(bitrate480 * 2),
    },
  ];

  return {
    gop,
    variants,
  };
};
