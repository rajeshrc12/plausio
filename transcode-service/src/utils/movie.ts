import { readdir, rm } from "node:fs/promises";
import { join } from "node:path";

export const printDirectoryTree = async (dir: string, indent = "") => {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const path = join(dir, entry.name);

    if (entry.isDirectory()) {
      console.log(`${indent}[DIR]  ${entry.name}`);
      await printDirectoryTree(path, `${indent}  `);
    } else {
      console.log(`${indent}[FILE] ${entry.name}`);
    }
  }
};

export const cleanData = async (workDir: string) => {
  await rm(workDir, {
    recursive: true,
    force: true,
  });
};
