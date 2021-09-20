import isNumber from "./is-number";

type TestCase = [unknown, boolean];

const testCases: TestCase[] = [
  [0, true],
  [NaN, false],
  [{}, false],
  [undefined, false],
  [null, false],
  [true, false],
  [false, false],
  ["", false],
  ["abc", false],
  [[], false],
  [[1], false],
  [[1, 2], false],
  [["abc"], false],
  [() => {}, false],
];

describe("isNumber", () => {
  test.each(testCases)(
    "it works as expected for test case %#",
    (prop, expected) => {
      expect(isNumber(prop)).toBe(expected);
    }
  );
});
