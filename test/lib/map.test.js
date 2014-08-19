

describe('Asynchronous Array map', function () {

  var map = require('../../lib/map');

  this.timeout(200);

  it('should validate with generator function', function * () {
    var counter = 0;
    var foo = [1, 2, 3, 4];
    var bar = yield map(foo, function * (item, index, arr) {
      arr.should.be.equal(foo);
      index.should.be.equal(counter++);
      item.should.be.a.Number;

      return item * 2;
    });

    counter.should.be.equal(foo.length);
    bar.should.be.eql([2, 4, 6, 8]);
  });

  it('should validate with thunk function', function * () {
    var counter = 0;
    var foo = [1, 2, 3, 4];
    var bar = yield map(foo, function (item, index, arr) {
      arr.should.be.equal(foo);
      index.should.be.equal(counter++);
      item.should.be.a.Number;

      return function (done) {
        done(null, item * 2);
      };
    });

    counter.should.be.equal(foo.length);
    bar.should.be.eql([2, 4, 6, 8]);
  });

});