/**
Asynchronous find
*/

module.exports = find;


/**
Returns a value in the array, if an element in the array satisfies the provided
asynchronous testing function. Otherwise undefined is returned.

@param {Array} arr                       an array
@param {Function|GeneratorFunction} fn   the callback function
@return {Array}
*/
function * find(arr, fn) {
  var iLen = arr.length;
  var i = 0;

  for (; i < iLen; ++i) {
    if (yield fn(arr[i], i, arr)) {
      return arr[i];
    }
  }
}