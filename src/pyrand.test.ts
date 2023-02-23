const pyrand = require("./pyrand");

test("randint(1, 1) to only generate 1's", () => {
  const randomIntegers = [];
  for (let i = 0; i < 10000; i++) {
    randomIntegers.push(pyrand.randint(1, 1));
  }
  const ones = randomIntegers.filter((int) => int === 1);
  expect(randomIntegers.length).toBe(ones.length);
});

test("randint(-1000, -1) returns only negative numbers", () => {
  const randomIntegers = [];
  for (let i = 0; i < 10000; i++) {
    randomIntegers.push(pyrand.randint(-1000, -1));
  }
  const negativeInts = randomIntegers.filter((int) => int <= -1);
  expect(randomIntegers.length).toBe(negativeInts.length);
});

test("randint returns only numbers within the range", () => {
  const start = 1;
  const end = 3;
  const randomIntegers = [];
  for (let i = 0; i < 10000; i++) {
    randomIntegers.push(pyrand.randint(start, end));
  }
  const integersWithinRange = randomIntegers.filter(
    (int) => int <= end && int >= start
  );

  expect(randomIntegers.length).toBe(integersWithinRange.length);
});

test("shuffle with zero element array returns empty array", () => {
  const firstArray: Array<any> = [];
  const secondArray: Array<any> = [];
  pyrand.shuffle(secondArray);
  expect(firstArray).toEqual(secondArray);
});

test("one element array is identical after being shuffled", () => {
  const firstArray: Array<any> = ["item"];
  const secondArray: Array<any> = ["item"];
  pyrand.shuffle(secondArray);
  expect(firstArray).toEqual(secondArray);
});

test("choice([]) returns undefined", () => {
  expect(pyrand.choice([])).toBe(undefined);
});

test("choice([1]) returns 1", () => {
  expect(pyrand.choice([1])).toBe(1);
});
