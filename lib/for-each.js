/**
Asynchronous forEach
*/

module.exports = forEach;


/**
Executes a provided asynchronous function once per array element.

@param {Array} arr                       an array
@param {Function|GeneratorFunction} fn   the callback function
*/
function * forEach(arr, fn) {
  var iLen = arr.length;
  var i = 0;

  for (; i < iLen; ++i) {
    yield fn(arr[i], i, arr);
  }
}