interface IteratorYieldResult<TYield> {
  done?: false;
  value: TYield
}

interface IteratorReturnResult<TReturn> {
  done: true;
  value: TReturn;
}

interface Iterable<T> {
  // TODO https://dev.to/gsarciotto/iterators-in-typescript-1d78
}