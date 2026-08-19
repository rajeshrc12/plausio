import { env } from "../config/env.js";
import axios from "axios";

import {
  createMovieData,
  createMovieSegments,
  downloadMovie,
  uploadHlsDir,
} from "./movie.js";
import { cleanData } from "../utils/movie.js";

type Video = {
  id: number;
  type: string;
  key: string;
  title: string;
};

export const worker = async (video: Video) => {
  const { id, type, title } = video;
  const { bucket, baseKey, fileName, workDir, hlsDir, inputFile } =
    await createMovieData({ id, type });
  try {
    await downloadMovie({ bucket, baseKey, fileName, inputFile, hlsDir });

    await createMovieSegments({ inputFile, hlsDir, title });

    await uploadHlsDir({ bucket, baseKey: `${baseKey}/hls`, hlsDir });

    updateMovieStatus({ id, status: "COMPLETED" });
  } catch (err) {
    updateMovieStatus({ id, status: "FAILED" });
    console.error(`[${id}] ❌ Video processing failed`);
    console.error(err);
  } finally {
    await cleanData(workDir);
    console.log(`[${id}] Temporary files cleaned up`);
  }
};
export async function updateMovieStatus({
  id,
  status,
}: {
  id: number;
  status: string;
}) {
  try {
    const response = await axios.post(
      `${env.UPLOAD_SERVICE_API_URL}/api/movie/status`,
      {
        id,
        status,
      },
    );
    console.log("success", await response.data);
  } catch (e) {
    console.log("error while updating movie status", e);
  }
}
