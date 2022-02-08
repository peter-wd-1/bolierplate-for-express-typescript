import pretify from "prettier-eslint";
import { readFile, writeFile } from "fs/promises";
import eslintConfig from "./.eslintrc.js";

export function getCurrentFileName() {
  const targetFile = process.argv[2];
  if (targetFile) {
    return targetFile;
  } else {
    throw new Error("Error check the filename");
  }
}

export async function getFileData(filename) {
  try {
    const data = await readFile(filename, { encoding: "utf-8" });
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}

export async function writeFileData(data, location = null) {
  let targetFile;
  if (!location) {
    targetFile = getCurrentFileName();
  }
  try {
    const done = await writeFile(location ? location : targetFile, data);
    return [done, null];
  } catch (error) {
    return [null, error];
  }
}

export default async function format(data = null) {
  let sourceCode;
  let error = false;

  if (data) {
    sourceCode = data;
  } else {
    const targetFile = getCurrentFileName();
    [sourceCode, error] = await getFileData(targetFile);
  }

  if (!error) {
    const option = {
      text: sourceCode,
      eslintConfig,
      prettierOptions: {
        bracketSpacing: true,
        parser: "babel",
      },
    };
    return pretify(option);
  } else {
    return console.error("could not able to read read file", error);
  }
}

export async function writeFormated(formated, location) {
  const [done, error] = await writeFileData(formated, location);
  if (error) {
    throw new Error(error);
  }
  return done;
}
