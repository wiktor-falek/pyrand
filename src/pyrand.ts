export function random(): number {
  return Math.random();
}

function choice(seq: any) {}

interface ChoicesOptions {
  // TODO: one or another https://stackoverflow.com/a/61281828/14416328
  weights: Array<number> | null;
  cumulativeWeights: Array<number> | null;
}
function choices(population: any, k: number = 1, options: ChoicesOptions) {}

export function randint(start: number, stop: number): number {
  if (!Number.isInteger(start)) {
    throw new Error("Argument 'start' must be an integer");
  }
  if (!Number.isInteger(stop)) {
    throw new Error("Argument 'stop' must be an integer");
  }
  return Math.floor(random() * (stop - start) + start);
}

function shuffle(iterable: Array<any>): any {
  // mutates the array
}

function sample(iterable: Array<any>): any {
  // returns a new shuffled array
}
