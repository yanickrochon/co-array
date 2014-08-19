/**
Asynchronous every
*/

module.exports = every;


/**
Tests whether all elements in the array pass the test implemented by the
provided asynchronous function.

@param {Array} arr                       an array
@param {Function|GeneratorFunction} fn   the callback function

@return {Boolean}
*/
function * every(arr, fn) {
  var iLen = arr.length;
  var i = 0;

  for (; i < iLen; ++i) {
    if (!(yield fn(arr[i], i, arr))) {
      return false;
    }
  }

  return true;
}