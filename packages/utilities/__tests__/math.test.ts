import { multiply, sum } from "../src/math/index";

test("adds 1 + 2 to equal 3", () => {
  expect(sum({ a: 1, b: 2 })).toBe(3);
});

test("multiplies 1 * 2 to equal 2", () => {
  expect(multiply({ a: 1, b: 2 })).toBe(2.0);
});
