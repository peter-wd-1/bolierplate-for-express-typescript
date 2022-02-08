import format, { getFileData, writeFileData } from "./.prettier";
import { exec } from "child_process";

beforeAll(() => {
  exec("echo test >.test");
  exec("echo 'let a = {console}' >.test.format");
});

afterAll(() => {
  exec("rm .test .test.*");
});

const getFileDataTest = (filename) => {
  describe(`test for getFileData function`, () => {
    test(`reads existing data from ${filename}`, async () => {
      const [data, _] = await getFileData(filename);
      expect(data).toBe("test\n");
    });
  });
};

test("writes new file", async () => {
  const location = ".test.write";
  await writeFileData("TEST DATA", location);
  const [data, _] = await getFileData(location);
  expect(data).toBe("TEST DATA");
});

test("fomats file", async () => {
  const location = ".test.format";
  const [data, _] = await getFileData(location);
  expect(data).toBe("let a = {console}");
  const formatted = await format(data);
  expect(formatted).toBe("let a = { console };\n");
});

test("writes formated files", async () => {
  const location = ".test.format";
  let [data, _] = await getFileData(location);
  expect(data).toBe("let a = {console}");
  const formatted = await format(data);
  await writeFileData(formatted, location);
  [data, _] = await getFileData(location);
  expect(data).toBe("let a = { console };\n");
});
