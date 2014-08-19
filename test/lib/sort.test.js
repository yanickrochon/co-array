

describe('Asynchronous Array sort', function () {

  var sort = require('../../lib/sort');

  this.timeout(200);

  it('should validate with no argument', function * () {
    var foo = [3, 1, 4, 2];
    
    yield sort(foo);
    foo.should.eql([1, 2, 3, 4]);
  });

  it('should validate with generator function', function * () {
    var foo = [3, 1, 4, 2];
    
    yield sort(foo, function * (a, b) { return b - a; });
    foo.should.eql([4, 3, 2, 1]);
  });

  it('should validate with thunk function', function * () {
    var foo = [3, 1, 4, 2];
    
    yield sort(foo, function (a, b) { return function (done) { return done(null, b - a); }; });
    foo.should.eql([4, 3, 2, 1]);
  });

});