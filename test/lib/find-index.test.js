

describe('Asynchronous Array find-index', function () {

  var findIndex = require('../../lib/find-index');

  this.timeout(200);

  it('should validate with generator function', function * () {
    var counter = 0;
    var foo = [1, 2, 3, 4];
    var bar = yield findIndex(foo, function * (item, index, arr) {
      arr.should.be.equal(foo);
      index.should.be.equal(counter++);
      item.should.be.a.Number;

      return item === 4;
    });

    counter.should.be.equal(foo.length);
    bar.should.be.equal(3);
  });

  it('should validate with thunk function', function * () {
    var counter = 0;
    var foo = [1, 2, 3, 4];
    var bar = yield findIndex(foo, function (item, index, arr) {
      arr.should.be.equal(foo);
      index.should.be.equal(counter++);
      item.should.be.a.Number;

      return function (done) {
        done(null, item === 4);
      };
    });

    counter.should.be.equal(foo.length);
    bar.should.be.equal(3);
  });

});