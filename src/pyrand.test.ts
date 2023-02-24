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

test("empty array as population returns an empty array, regardless of k", () => {
  let output;

  output = pyrand.choices([], 1, {});
  expect(output).toEqual([]);

  output = pyrand.choices([], 0, {});
  expect(output).toEqual([]);

  output = pyrand.choices([], -1, {});
  expect(output).toEqual([]);
});

test("empty array as weights option throws an error", () => {
  const output = pyrand.choices(["a", "b", "c"], 1, { weights: [] });
  expect(output).toThrow();
});

test("weights array does not match length of population - throws an error", () => {
  const output = pyrand.choices(["a", "b", "c"], 1, { weights: [1, 1] });
  expect(output).toThrow();
});

test("empty weights option throws an error", () => {
  const output = pyrand.choices(["a", "b", "c"], 1, { weights: [] });
  expect(output).toThrow();
});

test("items with weight >= 0 can't get selected", () => {
  const outputs = [];
  for (let i = 0; i < 10000; i++) {
    const output = pyrand.choices(["a", "b", "c"], 1, { weights: [0, 0, 1] });
    outputs.push(output);
  }
  const outputsWithoutCharacterC = outputs.filter((char) => char != "c");

  expect(outputsWithoutCharacterC.length).toBe(0);
});
