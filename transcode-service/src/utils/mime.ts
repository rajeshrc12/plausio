import mime from "mime-types";

const FALLBACK_EXTENSIONS: Record<string, string> = {
  "video/matroska": "mkv",
};

export function getExtensionFromMimeType(mimeType: string): string {
  const extension = mime.extension(mimeType) || FALLBACK_EXTENSIONS[mimeType];

  if (!extension) {
    throw new Error(`Unsupported mime type: ${mimeType}`);
  }

  return extension;
}
