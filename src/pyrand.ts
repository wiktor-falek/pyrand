import cloneDeep from "lodash.clonedeep";

export function random(): number {
  return Math.random();
}

/**
 * Returns a random integer from a range between *start* and *stop* (inclusive).
 */
export function randint(start: number, stop: number): number {
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
export function shuffle(array: Array<any>): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Shuffles a deep copy of the array and returns it.
 *
 * Even though this doesn't exist in the python library
 * there's no builtin way in JavaScript to create a deep copy.
 */
export function shuffleCopy(array: Array<any>): Array<any> {
  const arrayCopy = cloneDeep(array);
  shuffle(arrayCopy);
  return arrayCopy;
}

/**
 * Returns a random element from the array
 */
export function choice(array: Array<any>): any | undefined {
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
