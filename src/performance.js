let wrap = require('decorator-wrap').wrap;
let now = require("performance-now");
let _ = require('lodash');

let logPerformance = function (callback, args, name) {
  console.time(name);
  let value = callback();
  console.timeEnd(name);
  return value;
};

let logPerformanceCustomized = function (templateString = '<%= name %> tok <%= time %> ms') {
  let template = _.template(templateString);
  return function (callback, args, name) {
    let start = now();
    let value = callback();
    let end = now();
    let time = (end - start).toFixed(3);
    let data = {name, time};
    console.log(template(data));
    return value;
  }
};


export function performance(target, key, descriptor) {
  if (target === undefined || _.isString(target)) {
    let template = target;
    return function (target, key, descriptor) {
      return wrap(logPerformanceCustomized(template))(target, key, descriptor);
    }
  } else {
    return wrap(logPerformance)(target, key, descriptor);
  }
};