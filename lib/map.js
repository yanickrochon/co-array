/**
Asynchronous map
*/

module.exports = map;


/**
Creates a new array with the results of calling a provided asynchronous function
on every element in this array.

@param {Array} arr                       an array
@param {Function|GeneratorFunction} fn   the callback function
@return {Array}
*/
function * map(arr, fn) {
  var mapped = [];
  var iLen = arr.length;
  var i = 0;

  for (; i < iLen; ++i) {
    mapped.push(yield fn(arr[i], i, arr));
  }

  return mapped;
}