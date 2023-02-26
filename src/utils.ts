/**
 * Return the index where to insert item x in list a, assuming a is sorted.
 * 
 * The return value i is such that all e in a[:i] have e <= x, and all e in
 * a[i:] have e > x.  So if x already appears in the list, a.insert(i, x) will
 * insert just after the rightmost x already there.
 * 
 * Optional args lo (default 0) and hi (default len(a)) bound the
 * slice of a to be searched.
*/
export function bisectRight(
  a: Array<number>,
  x: number,
  lo: number = 0,
  hi: number | undefined = undefined
): number {
  if (lo < 0 || !Number.isInteger(lo)) {
    throw new Error("Argument lo must be a positive integer");
  }

  if (hi == null) {
    hi = a.length;
  }

  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (x < a[mid]) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }

  return lo;
}

export function accumulate(array: Array<number>): Array<number> {
  const result: Array<number> = [];
  let acc = 0;
  for (let i = 0; i < array.length; i++) {
    acc += array[i];
    result.push(acc);
  }
  return result;
}
