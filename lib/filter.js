/**
Asynchronous filter
*/

module.exports = filter;


/**
Creates a new array with all elements that pass the test implemented by the 
provided asynchronous function.

@param {Array} arr                       an array
@param {Function|GeneratorFunction} fn   the callback function
@return {Array}
*/
function * filter(arr, fn) {
  var filtered = [];
  var iLen = arr.length;
  var i = 0;

  for (; i < iLen; ++i) {
    if (yield fn(arr[i], i, arr)) {
      filtered.push(arr[i]);    
    }
  }

  return filtered;
}