import format, { getFileData, writeFileData, createFormat } from "./.prettier";
import { exec } from "child_process";

afterAll(() => {
  exec("rm .test .test.*");
});

const getFileDataTest = async (filename = ".test", testContent = "test") => {
  exec(`echo ${testContent} > ${filename}`);
  describe(`test for getFileData function`, () => {
    it(`reads existing data from ${filename}`, async () => {
      const [data, _] = await getFileData(filename);
      expect(data).toBe(`${testContent}\n`);
    });
  });
};

const writeFileDataTest = (filename = ".test.write", testContent = "test") => {
  getFileDataTest(filename, testContent);
  describe(`test for writeFileData function`, () => {
    test(`writes new file @${filename}`, async () => {
      await writeFileData(testContent, filename);
    });
  });
};

const createFormatTest = (
  filename = ".test.createFormat",
  goal = "let a = { console }\n",
  target = "let a = {console}"
) => {
  writeFileDataTest(filename, target);
  describe(`test for formatCreate function`, () => {
    test("creates format", async () => {
      const formatted = await createFormat(target);
      expect(formatted).toBe(goal);
    });
  });
};

const formatTest = (
  filename = ".test.format",
  goal = "let a = { console }\n",
  target = "let a = {console}"
) => {
  writeFileDataTest(filename, target);
  describe(`test for format function`, () => {
    test("formats file", async () => {
      const [data, _] = await getFileData(filename);
      const afterFormatted = await format(filename, data);
      await getFileData(filename);
      expect(afterFormatted).toBe(goal);
    });
  });
};

getFileDataTest(".test");
writeFileDataTest(".test.write");
createFormatTest(".test.createformat");
formatTest(".test.format");
