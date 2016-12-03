var ordinal = require('ordinal-numbers')

exports.paramError = paramError

function paramError (nth, received, expected, node) {
  var error = new TypeError(ordinal(nth+1) + ' parameter ' + received + ' should be ' + expected)
  error.stack = ''
  if (node.loc) {
    error.lineNumber = node.loc.start.line
    error.columnNumber = node.loc.start.column
  }
  return error
}
