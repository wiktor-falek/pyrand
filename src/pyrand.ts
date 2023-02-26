import { accumulate, bisectRight } from "./utils";

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

/**
 * Returns k sized array of population elements chosen with replacement.
 * If the relative weights or cumulative weights are not specified,
 * the selections are made with equal probability.
 * @param {Array<any>} population
 * @param {number} k
 * @param {{weights?: Array<number>, cumWeights?: Array<number>}} options
 * @returns
 */
function choices(
  population: Array<any>,
  k: number = 1,
  options?: {
    weights?: Array<number>;
    cumWeights?: Array<number>;
  }
): Array<any> | undefined {
  const weights = options?.weights;
  let cumWeights = options?.cumWeights;

  if (!Number.isInteger(k)) {
    throw new TypeError("Non-integer argument 'k'");
  }

  if (weights != null && cumWeights != null) {
    throw new Error("Cannot specify both weights and cumulative weights");
  }

  if (weights != null && weights.length !== population.length) {
    throw new Error("The number of weights does not match the population");
  }

  if (cumWeights != null && cumWeights.length !== population.length) {
    throw new Error("The number of cumWweights does not match the population");
  }

  if (population.length === 0) {
    return [];
  }

  const n = population.length;
  const result: Array<any> = [];

  if (weights == null && cumWeights == null) {
    for (let i = 0; i < k; i++) {
      // choose k random elements from population at equal weight
      // if weights or cumWeights arguments are not specified
      result.push(population[Math.floor(random() * n)]);
    }
  } else {
    if (cumWeights == null) {
      cumWeights = accumulate(weights!);
    }
    const total = cumWeights[cumWeights.length - 1];

    if (total <= 0) {
      throw new Error("Total of weights must be greater than zero");
    }

    const hi = n - 1;
    for (let i = 0; i < k; i++) {
      const idx = bisectRight(cumWeights, random() * total, 0, hi);
      const item = population[idx];
      result.push(item);
    }
  }

  return result;
}

module.exports = {
  random,
  randint,
  shuffle,
  choice,
  choices,
};
