

describe('Asynchronous Array reduce', function () {

  var reduce = require('../../lib/reduce');

  this.timeout(200);

  it('should validate with generator function', function * () {
    var counter = 0;
    var foo = [1, 2, 3, 4];
    var bar = yield reduce(foo, function * (value, item, index, arr) {
      arr.should.be.equal(foo);
      index.should.be.equal(counter++);
      item.should.be.a.Number.and.equal(counter);

      return value + item;
    }, 0);

    counter.should.be.equal(foo.length);
    bar.should.be.equal(10);
  });

  it('should validate with thunk function', function * () {
    var counter = 0;
    var foo = [1, 2, 3, 4];
    var bar = yield reduce(foo, function (value, item, index, arr) {
      arr.should.be.equal(foo);
      index.should.be.equal(counter++);
      item.should.be.a.Number.and.equal(counter);

      return function (done) {
        done(null, value + item);
      };
    }, 0);

    counter.should.be.equal(foo.length);
    bar.should.be.equal(10);
  });

});