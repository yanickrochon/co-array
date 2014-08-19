/**
Asynchronous some
*/

module.exports = some;


/**
Tests whether some element in the array passes the test implemented by the
provided asynchronous function.

@param {Array} arr                       an array
@param {Function|GeneratorFunction} fn   the callback function

@return {Boolean}
*/
function * some(arr, fn) {
  var iLen = arr.length;
  var i = 0;

  for (; i < iLen; ++i) {
    if (yield fn(arr[i], i, arr)) {
      return true;
    }
  }

  return false;
}