/**
 * Returns a pseudorandom number between 0 and 1.
 * @returns {number}
 */
export declare function random(): number;
/**
 * Returns a random integer from a range between *start* and *stop* (inclusive).
 * @param {number} start
 * @param {number} stop
 * @returns {number}
 */
export declare function randint(start: number, stop: number): number;
/**
 * Shuffles the array in place.
 * @param {Array<any>} array
 */
export declare function shuffle(array: Array<any>): void;
/**
 * Returns a random element from the array. If array is empty returns undefined.
 * @param {Array<any>} array
 * @returns {any}
 */
export declare function choice(array: Array<any>): any;
/**
 * Returns k sized array of population elements chosen with replacement.
 * If the relative weights or cumulative weights are not specified,
 * the selections are made with equal probability.
 * @param {Array<any>} population
 * @param {number} k
 * @param {{weights?: Array<number>, cumWeights?: Array<number>}} options
 * @returns
 */
export declare function choices(population: Array<any>, k?: number, options?: {
    weights?: Array<number>;
    cumWeights?: Array<number>;
}): Array<any> | undefined;
