var assert = require("assert");
var performance = require('../src/performance').performance;

describe('Performance logging', function() {
  it('it should log out the performance of the method', function () {
    class SuperNiceClass {
      @performance
      @performance()
      @performance('Customized output!!! TIME = <%= time %> ms NAME = <%= name %>')
      bar(a) {
        let x = 0;
        for ( let i = 1; i < 100000000; i++){
          x += i;
        }
        return x;
      }
    }
    new SuperNiceClass().bar(10)
  });

});