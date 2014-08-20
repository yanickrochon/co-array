
var registry = {
  every: require('./every'),
  filter: require('./filter'),
  find: require('./find'),
  findIndex: require('./find-index'),
  forEach: require('./for-each'),
  map: require('./map'),
  reduce: require('./reduce'),
  reduceRight: require('./reduce-right'),
  some: require('./some'),
  sort: require('./sort')
};


module.exports = function coArray(arr) {
  return new AsyncArray(arr);
}


/**
Async Array wrapper

@param {Array} arr
*/
function AsyncArray(arr) {
  bindAsyncAPI(this, arr);
}


/**
Private function to hide implementation
*/
function bindAsyncAPI(instance, arr) {
  var stack = [];
  var value = arr;

  function * proxyWithreturnCarry(gen, fn, carry) {
    arr = yield gen(arr, fn, carry);
  }

  function * proxyWithReturn(gen, fn) {
    arr = yield gen(arr, fn);
  }

  function * proxyWithoutReturn(gen, fn) {
    yield gen(arr, fn);
  }

  Object.defineProperties(instance, {
    'every': {
      configurable: false,
      enumerable: true,
      writable: false,
      value: function (fn) {
        stack.push(proxyWithReturn(registry.every, fn));
        return this;
      }
    },
    'filter': {
      configurable: false,
      enumerable: true,
      writable: false,
      value: function (fn) {
        stack.push(proxyWithReturn(registry.filter, fn));
        return this;
      }
    },
    'find': {
      configurable: false,
      enumerable: true,
      writable: false,
      value: function (fn) {
        stack.push(proxyWithReturn(registry.find, fn));
        return this;
      }
    },
    'findIndex': {
      configurable: false,
      enumerable: true,
      writable: false,
      value: function (fn) {
        stack.push(proxyWithReturn(registry.findIndex, fn));
        return this;
      }
    },
    'forEach': {
      configurable: false,
      enumerable: true,
      writable: false,
      value: function (fn) {
        stack.push(proxyWithoutReturn(registry.forEach, fn));
        return this;
      }
    },
    'map': {
      configurable: false,
      enumerable: true,
      writable: false,
      value: function (fn) {
        stack.push(proxyWithReturn(registry.map, fn));
        return this;
      }
    },
    'reduce': {
      configurable: false,
      enumerable: true,
      writable: false,
      value: function (fn) {
        if (arguments.length > 1) {
          stack.push(proxyWithreturnCarry(registry.reduce, fn, arguments[1]));
        } else {
          stack.push(proxyWithReturn(registry.reduce, fn));
        }
        return this;
      }
    },
    'reduceRight': {
      configurable: false,
      enumerable: true,
      writable: false,
      value: function (fn, initialValue) {
        if (arguments.length > 1) {
          stack.push(proxyWithreturnCarry(registry.reduceRight, fn, arguments[1]));
        } else {
          stack.push(proxyWithReturn(registry.reduceRight, fn));
        }
        return this;
      }
    },
    'some': {
      configurable: false,
      enumerable: true,
      writable: false,
      value: function (fn) {
        stack.push(proxyWithReturn(registry.some, fn));
        return this;
      }
    },
    'sort': {
      configurable: false,
      enumerable: true,
      writable: false,
      value: function (fn) {
        stack.push(proxyWithReturn(registry.sort, fn));
        return this;
      }
    },
    'result': {
      configurable: false,
      enumerable: true,
      get: function * () {
        // execute sequentially, in the same order
        while (stack.length) {
          yield stack.shift();
        }
        return arr;
      }
    }
  });

}