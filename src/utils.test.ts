const { accumulate, bisectRight } = require("./utils");

test("accumulate accumulates correctly", () => {
  expect(accumulate([1, 5, 9])).toEqual([1, 6, 15])
  expect(accumulate([-10, 5, -1, 0, 5])).toEqual([-10, -5, -6, -6, -1])
})