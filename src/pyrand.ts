function random(): number {
  return Math.random();
}

/**
 * Returns a random integer from a range between *start* and *stop* (inclusive).
 */
function randint(start: number, stop: number): number {
  if (!Number.isInteger(start)) {
    throw new Error("Non-integer argument 'start'");
  }

  if (!Number.isInteger(stop)) {
    throw new Error("Non-integer argument 'stop'");
  }

  if (start > stop) {
    throw new Error(`Empty range (${start}, ${stop})`);
  }

  return Math.floor(random() * (stop + 1 - start)) + start;
}

/**
 * Shuffles the array in place.
 */
function shuffle(array: Array<any>): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Returns a random element from the array
 */
function choice(array: Array<any>): any | undefined {
  const index = randint(0, Math.max(0, array.length - 1));
  return array[index];
}

interface SampleOptions {
  k?: number;
  counts?: Array<number>;
}
// TODO: implement
function sample(population: Array<any>, options: SampleOptions) {
  const { k, counts } = options;

  if (counts != null && counts.length !== population.length) {
    throw new Error("The number of counts does not match the population");
  }
}

module.exports = {
  random,
  randint,
  shuffle,
  choice,
};
