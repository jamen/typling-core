var query = require('./query')
var infer = require('./infer')
var ordinal = require('ordinal-numbers')
var paramError = require('./error').paramError
var walk = require('./walk')

module.exports = verify

function verify (node, types) {
  // Walk and verify node types.
  for (var pending = [node], report = [], type; pending.length;) {
    node = pending.shift()
    walk(node, pending)
    // Verify call expression
    if (node.type === 'CallExpression') {
      verifyCallExpression(node, types, report);
    }
  }
  return report
}

function verifyCallExpression (node, types, report) {
  var type = query(node, types)
  if (type) {
    var args = node.arguments
    var params = type[0]
    for (var i = args.length; i--;) {
      var arg = args[i]
      var argType = infer(arg, types)
      var paramType = params[i]
      if (argType !== paramType) {
        report.push(paramError(i, argType, paramType, arg))
      }
    }
  }
}
