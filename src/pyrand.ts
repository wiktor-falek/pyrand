/**
 * Returns a pseudorandom number between 0 and 1.
 * @returns {number}
 */
function random(): number {
  return Math.random();
}

/**
 * Returns a random integer from a range between *start* and *stop* (inclusive).
 * @param {number} start
 * @param {number} stop
 * @returns {number}
 */
function randint(start: number, stop: number): number {
  if (!Number.isInteger(start)) {
    throw new TypeError("Non-integer argument 'start'");
  }

  if (!Number.isInteger(stop)) {
    throw new TypeError("Non-integer argument 'stop'");
  }

  if (start > stop) {
    throw new Error(`Empty range (${start}, ${stop})`);
  }

  return Math.floor(random() * (stop + 1 - start)) + start;
}

/**
 * Shuffles the array in place.
 * @param {Array<any>} array
 */
function shuffle(array: Array<any>): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Returns a random element from the array. If array is empty returns undefined.
 * @param {Array<any>} array
 * @returns {any}
 */
function choice(array: Array<any>): any {
  const index = randint(0, Math.max(0, array.length - 1));
  return array[index];
}

// TODO: implement
// interface SampleOptions {
//   k?: number;
//   counts?: Array<number>;
// }
// function _sample(population: Array<any>, options: SampleOptions): void {
//   const { k, counts } = options;
//   if (counts != null && counts.length !== population.length) {
//     throw new Error("The number of counts does not match the population");
//   }
// }

module.exports = {
  random,
  randint,
  shuffle,
  choice,
};
