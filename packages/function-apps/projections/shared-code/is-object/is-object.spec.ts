import isObject from "./is-object";

type TestCase = [unknown, boolean];

const testCases: TestCase[] = [
  [{}, true],
  [undefined, false],
  [null, false],
  ["", false],
  ["abc", false],
  [true, false],
  [false, false],
  [0, false],
  [1, false],
  [[], false],
  [() => {}, false],
];

describe("isObject", () => {
  test.each(testCases)(
    "it works as expected for test case %#",
    (prop, expected) => {
      expect(isObject(prop)).toBe(expected);
    }
  );
});
