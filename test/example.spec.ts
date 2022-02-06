import { describe, expect, test } from "@jest/globals";
import { StringHelpers } from "../src/shared";

describe("Example", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(1 + 2).toBe(3);
  });
  describe("StringHelpers", () => {
    it("replaceVietNameseTones", () => {
      const testcases = [{ input: "Đức", expected: "duc" }];
      expect(StringHelpers.replaceVietNameseTones(testcases[0].input)).toEqual(
        testcases[0].expected
      );
    });
  });
});
