/**
Asynchronous reduceRight
*/

module.exports = reduceRight;


/**
applies an asynchronous function against an accumulator and each value of the
array (from right-to-left) as to reduce it to a single value.

@param {Array} arr                       an array
@param {Function|GeneratorFunction} fn   the callback function
*/
function * reduceRight(arr, fn, accumulator) {
  var iLen = arr.length;
  var i = iLen - 1;

  if (iLen && (arguments.length <= 2)) {
    accumulator = arr[i--];
  }

  for (; i >= 0; --i) {
    accumulator = yield fn(accumulator, arr[i], i, arr);
  }

  return accumulator;
}