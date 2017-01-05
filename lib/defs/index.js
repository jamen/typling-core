module.exports = [
  './primitive',
].reduce(function (definitions, path) {
  for (var file = require(path), keys = Object.keys(file), i = keys.length; i--;) {
    var key = keys[i]
    definitions[key] = file[key]
  }
  return definitions
}, {})
