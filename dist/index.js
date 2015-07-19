'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.performance = performance;
var wrap = require('decorator-wrap').wrap;
var now = require('performance-now');
var _ = require('lodash');

var logPerformance = function logPerformance(callback, args, name) {
  console.time(name);
  var value = callback();
  console.timeEnd(name);
  return value;
};

var logPerformanceCustomized = function logPerformanceCustomized() {
  var templateString = arguments.length <= 0 || arguments[0] === undefined ? '<%= name %> tok <%= time %> ms' : arguments[0];

  var template = _.template(templateString);
  return function (callback, args, name) {
    var start = now();
    var value = callback();
    var end = now();
    var time = (end - start).toFixed(3);
    var data = { name: name, time: time };
    console.log(template(data));
    return value;
  };
};

function performance(target, key, descriptor) {
  if (target === undefined || _.isString(target)) {
    var _ret = (function () {
      var template = target;
      return {
        v: function (target, key, descriptor) {
          return wrap(logPerformanceCustomized(template))(target, key, descriptor);
        }
      };
    })();

    if (typeof _ret === 'object') return _ret.v;
  } else {
    return wrap(logPerformance)(target, key, descriptor);
  }
}

;