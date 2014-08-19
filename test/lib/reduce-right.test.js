

describe('Asynchronous Array reduceRight', function () {

  var reduceRight = require('../../lib/reduce-right');

  this.timeout(200);

  it('should validate with generator function', function * () {
    var counter = 3;
    var foo = [1, 2, 3, 4];
    var bar = yield reduceRight(foo, function * (value, item, index, arr) {
      arr.should.be.equal(foo);
      index.should.be.equal(counter--);
      //item.should.be.a.Number.and.equal(counter);

      return value + item;
    }, 0);

    counter.should.be.equal(-1);
    bar.should.be.equal(10);
  });

  it('should validate with thunk function', function * () {
    var counter = 3;
    var foo = [1, 2, 3, 4];
    var bar = yield reduceRight(foo, function (value, item, index, arr) {
      arr.should.be.equal(foo);
      index.should.be.equal(counter--);
      //item.should.be.a.Number.and.equal(counter);

      return function (done) {
        done(null, value + item);
      };
    }, 0);

    counter.should.be.equal(-1);
    bar.should.be.equal(10);
  });

});