/**
Asynchronous sort
*/

module.exports = sort;


/**
Sorts the elements of an array in place and returns the array. The sort is not
necessarily stable. The default sort order is according to string Unicode code points.

@param {Array} arr                       an array
@param {Function|GeneratorFunction} fn   the comparator function

@return {Boolean}
*/
function * sort(arr, fn) {
  if (!fn) {
    fn = defaultComparator;
  }

  yield mergeSort(fn, arr, 0, arr.length);

  return arr;
}

function * mergeSort(comp, arr, begin, end) {
  var size = end - begin;
  var begin_right;

  if (size < 2) {
    return;
  } 

  begin_right = begin + Math.floor(size / 2);

  yield mergeSort(comp, arr, begin, begin_right);
  yield mergeSort(comp, arr, begin_right, end);
  yield merge(comp, arr, begin, begin_right, end);
}

function * merge(comp, arr, begin, begin_right, end) {
  var v;
  for (; begin < begin_right; ++begin) {
    //if (arr[begin] > arr[begin_right]) {
    if ((yield comp(arr[begin], arr[begin_right])) > 0) {
      v = arr[begin];
      arr[begin] = arr[begin_right];

      yield insert(comp, arr, begin_right, end, v);
    }
  }
}

function * insert(comp, arr, begin, end, v) {
  var tmp;

  //while (begin + 1 < end && arr[begin + 1] < v) {
  while (begin + 1 < end && (yield comp(arr[begin + 1], v)) < 0) {
    tmp = arr[begin];
    arr[begin] = arr[begin + 1];
    arr[begin + 1] = tmp;

    //swap(arr, begin, begin + 1);
    ++begin;
  }
  arr[begin] = v;
}

//function swap(arr, a, b) {
//  var tmp = arr[a];
//  arr[a] = arr[b];
//  arr[b] = tmp;
//}


function * defaultComparator(a, b) {
  return a.toString().localeCompare(b.toString());
}