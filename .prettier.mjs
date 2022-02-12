import pretify from "prettier-eslint";
import { readFile, writeFile } from "fs/promises";
import eslintConfig from "./.eslintrc.cjs";

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
    const data = await readFile(filename, { encoding: "utf8" });
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
    await writeFile(location ? location : targetFile, data);
  } catch (error) {
    console.error(error);
    return error;
  }
  return true;
}

export async function createFormat(targetCode = null) {
  let sourceCode;
  let error = false;

  if (targetCode) {
    sourceCode = targetCode;
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
        singleQuote: true,
        semi: false,
        trailingComma: "none",
      },
    };
    return pretify(option);
  } else {
    return console.error("could not able to read read file", error);
  }
}

export default async function format(location = null, targetCode = null) {
  const formatedCode = await createFormat(targetCode);
  return (await writeFileData(formatedCode, location)) ? formatedCode : false;
}

format();
