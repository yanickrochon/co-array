

describe('coArray', function () {

  var coArray = require('../../lib/');

  it('should expose all available functions', function () {
    var instance = coArray();

    instance.every.should.be.a.Function;
    instance.filter.should.be.a.Function;
    instance.find.should.be.a.Function;
    instance.findIndex.should.be.a.Function;
    instance.forEach.should.be.a.Function;
    instance.map.should.be.a.Function;
    instance.reduce.should.be.a.Function;
    instance.reduceRight.should.be.a.Function;
    instance.some.should.be.a.Function;
    instance.sort.should.be.a.Function;

    instance.result.__proto__.constructor.name.should.be.equal('GeneratorFunctionPrototype');
  });

  it('should chain calls', function * () {
    var arr = [20, 1, 9, 11, 13, 2, 7, 17, 16, 4, 8, 14, 15, 3, 5, 10, 6, 12, 18, 19];

    (yield coArray(arr).result).should.be.equal(arr);

    (yield coArray(arr).every(function * (item) {
      return item > 0;
    }).result).should.be.true;

    (yield coArray(arr).map(function * (item) {
      return item * 2;
    }).sort().filter(function * (item) {
      return item % 3 === 0;
    }).result).should.be.eql([12, 18, 24, 30, 36, 6]);
  });

});