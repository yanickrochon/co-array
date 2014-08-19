

describe('Asynchronous Array forEach', function () {

  var forEach = require('../../lib/for-each');

  this.timeout(200);

  it('should validate with generator function', function * () {
    var counter = 0;
    var foo = [1, 2, 3, 4];
    var bar = yield forEach(foo, function * (item, index, arr) {
      arr.should.be.equal(foo);
      index.should.be.equal(counter++);
      item.should.be.a.Number.and.equal(counter);      
    });

    counter.should.be.equal(foo.length);
  });

  it('should validate with thunk function', function * () {
    var counter = 0;
    var foo = [1, 2, 3, 4];
    var bar = yield forEach(foo, function (item, index, arr) {
      arr.should.be.equal(foo);
      index.should.be.equal(counter++);
      item.should.be.a.Number.and.equal(counter);

      return function (done) {
        done(null);
      };
    });

    counter.should.be.equal(foo.length);
  });

});