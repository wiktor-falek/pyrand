import { accumulate, bisectRight } from "./utils";

/**
 * Returns a pseudorandom number between 0 and 1.
 * @returns {number}
 */
function random(): number {
  return Math.random();
}

/**
 * Returns a random integer from a range between *start* and *stop* (including the endpoint).
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
    const j = Math.floor(random() * (i + 1));
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

/*
Chooses k unique random elements from a population sequence or set.

Returns a new list containing elements from the population while
leaving the original population unchanged.  The resulting list is
in selection order so that all sub-slices will also be valid random
samples.  This allows raffle winners (the sample) to be partitioned
into grand prize and second place winners (the subslices).

Members of the population need not be hashable or unique.  If the
population contains repeats, then each occurrence is a possible
selection in the sample.

Repeated elements can be specified one at a time or with the optional
counts parameter.  For example:

    sample(['red', 'blue'], counts=[4, 2], k=5)

is equivalent to:

    sample(['red', 'red', 'red', 'red', 'blue', 'blue'], k=5)

To choose a sample from a range of integers, use range() for the
population argument.  This is especially fast and space efficient
for sampling from a large population:

    sample(range(10000000), 60)
*/
function sample(
  population: Array<any>,
  k: number,
  counts?: Array<number> | null
): Array<any> {
  const n = population.length;
  if (k <= 0 || k > n) {
    throw new Error("Sample larger than population or is negative");
  }
  if (counts != null) {
    const cumCounts = accumulate(counts);
    if (cumCounts.length != n) {
      throw new Error("The number of counts does not match the population");
    }
    const total = cumCounts.pop();
    if (total == null || !Number.isInteger(total)) {
      throw new Error("Couts must be integers");
    }

    if (total <= 0) {
      throw new Error("Total of counts must be greater than zero");
    }

    const range = Array(3)
      // @ts-ignore
      .fill()
      .map((_, i) => i);
    const selections = sample(range, k);

    const result = [];
    for (const s of selections) {
      result.push(population[bisectRight(cumCounts, s)]);
    }
    return result;
  }
  /*
  randbelow = self._randbelow
        if not 0 <= k <= n:
            raise ValueError("Sample larger than population or is negative")
        result = [None] * k
        setsize = 21        # size of a small set minus size of an empty list
        if k > 5:
            setsize += 4 ** _ceil(_log(k * 3, 4))  # table size for big sets
        if n <= setsize:
            # An n-length list is smaller than a k-length set.
            # Invariant:  non-selected at pool[0 : n-i]
            pool = list(population)
            for i in range(k):
                j = randbelow(n - i)
                result[i] = pool[j]
                pool[j] = pool[n - i - 1]  # move non-selected item into vacancy
        else:
            selected = set()
            selected_add = selected.add
            for i in range(k):
                j = randbelow(n)
                while j in selected:
                    j = randbelow(n)
                selected_add(j)
                result[i] = population[j]
        return result
  */

  return [];
}

module.exports = {
  random,
  randint,
  shuffle,
  choice,
  choices,
};
