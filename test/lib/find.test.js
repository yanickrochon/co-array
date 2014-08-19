

describe('Asynchronous Array find', function () {

  var find = require('../../lib/find');

  this.timeout(200);

  it('should validate with generator function', function * () {
    var counter = 0;
    var foo = [1, 2, 3, 4];
    var bar = yield find(foo, function * (item, index, arr) {
      arr.should.be.equal(foo);
      index.should.be.equal(counter++);
      item.should.be.a.Number;

      return item === 4;
    });

    counter.should.be.equal(foo.length);
    bar.should.be.equal(4);
  });

  it('should validate with thunk function', function * () {
    var counter = 0;
    var foo = [1, 2, 3, 4];
    var bar = yield find(foo, function (item, index, arr) {
      arr.should.be.equal(foo);
      index.should.be.equal(counter++);
      item.should.be.a.Number;

      return function (done) {
        done(null, item === 4);
      };
    });

    counter.should.be.equal(foo.length);
    bar.should.be.equal(4);
  });

});