var ordinal = require('ordinal-numbers')

exports.param = paramError

function paramError (nth, received, expected, node) {
  var error = new TypeError(ordinal(nth+1) + ' parameter ' + received + ' should be ' + expected)
  if (node) error.target = node
  error.stack = ''
  return error
}
