# co-array

Asynchronous array API for co.


## Installation

```
npm install co-array --save
```

## Usage

```javascript
var coArray = require('co-array');

co(function * () {
  var items = yield fetchAllItems();

  items = yield coArray.filter(items, function * (item) {
    return yield itemFilter(item);
  });

  return yield coArray.sort(items, itemSorter);
})(function (err, items) {

  console.log("Resulting items:", items);

});
```

## Available functions

Each of the following functions require two argument; an `Array` and a `Function` (or `GeneratorFunction`, etc.).

* **every**
* **filter**
* **find**
* **findIndex**
* **forEach**
* **map**
* **reduce**
* **reduceRight**
* **some**
* **sort**


## Limitations

This asynchronous replacements cannot be chained directly.


## Contribution

All contributions welcome! Every PR **must** be accompanied by their associated
unit tests!


## License

The MIT License (MIT)

Copyright (c) 2014 Mind2Soft <yanick.rochon@mind2soft.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.