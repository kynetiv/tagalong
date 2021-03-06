var evaluate = require('./evaluate').evaluate;
var functor = require('./functor');

var pattern = /{{\s*([^}]+)\s*}}/g;

var isTemplate = function(str) {
  return new RegExp(pattern).test(str);
};

var compile = function(template) {
  if (typeof template !== 'string') {
    throw new Error('interpolate.compile() expected a string;' +
                    'got ' + (typeof template));
  }

  if (!isTemplate(template)) {
    return functor(template);
  }

  return function(data) {
    var that = this;
    return template.replace(pattern, function(_, part) {
      return evaluate.call(that, part, data);
    });
  };
};

var interpolate = function interpolate(str, data) {
  return compile(str).call(this, data);
};

module.exports = interpolate;

module.exports.isTemplate = isTemplate;

module.exports.compile = compile;
