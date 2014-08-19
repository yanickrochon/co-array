

describe('Asynchronous Array every', function () {

  var every = require('../../lib/every');

  this.timeout(200);

  it('should validate with generator function', function * () {
    var counter = 0;
    var foo = [1, 2, 3, 4];
    var bar = yield every(foo, function * (item, index, arr) {
      arr.should.be.equal(foo);
      index.should.be.equal(counter++);
      item.should.be.a.Number.and.equal(counter);

      return true;
    });

    counter.should.be.equal(foo.length);
    bar.should.be.true;
  });

  it('should validate with thunk function', function * () {
    var counter = 0;
    var foo = [1, 2, 3, 4];
    var bar = yield every(foo, function (item, index, arr) {
      arr.should.be.equal(foo);
      index.should.be.equal(counter++);
      item.should.be.a.Number.and.equal(counter);

      return function (done) {
        done(null, true);
      };
    });

    counter.should.be.equal(foo.length);
    bar.should.be.true;
  });

});