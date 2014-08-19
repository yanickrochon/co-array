/**
Asynchronous reduce
*/

module.exports = reduce;


/**
Applies an asynchronous function against an accumulator and each value of the array (from
left-to-right) has to reduce it to a single value.

@param {Array} arr                       an array
@param {Function|GeneratorFunction} fn   the callback function
*/
function * reduce(arr, fn, accumulator) {
  var iLen = arr.length;
  var i = 0;
  
  if (iLen && (arguments.length <= 2)) {
    accumulator = arr[i++];
  }

  for (; i < iLen; ++i) {
    accumulator = yield fn(accumulator, arr[i], i, arr);
  }

  return accumulator;
}