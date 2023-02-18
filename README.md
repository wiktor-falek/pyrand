# Python random module ported to JavaScript

NOTE: This module is not finished, many functions are missing, and the code is untested

<br>

## Installation

### With npm
```sh
npm install pyrand
```

## Usage

```ts
import { random, randint, shuffle, choice } from "pyrand";

// or using CommonJS syntax
const { random, randint, shuffle, choice } = require("pyrand");

random(); // returns random float between 0 and 1

randint(1, 3); // returns a random integer between 1 and 3 (inclusive)

const array = [1, 2, 3];
shuffle([1, 2, 3]); // shuffles elements of the array in random order

choice(["apple", "orange", "banana"]); // returns a random element from the array
```
