/**
Asynchronous findIndex
*/

module.exports = findIndex;


/**
Returns an index in the array, if an element in the array satisfies the provided
asynchronous testing function. Otherwise -1 is returned.

@param {Array} arr                       an array
@param {Function|GeneratorFunction} fn   the callback function
@return {Array}
*/
function * findIndex(arr, fn) {
  var iLen = arr.length;
  var i = 0;

  for (; i < iLen; ++i) {
    if (yield fn(arr[i], i, arr)) {
      return i;
    }
  }

  return -1;
}