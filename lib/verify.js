var util = require('./util')
var ordinal = require('ordinal-numbers')

module.exports = verify

function verify (node, types) {
  var report = []
  // Walk and verify node types.
  for (var pending = [node], type; pending.length;) {
    node = pending.shift()
    util.walk(node, pending)
    // Verify call expression
    if (node.type === 'CallExpression') {
      verifyCallExpression(node, types, report);
    }
  }
  return report
}

function verifyCallExpression (node, types, report) {
  var type = util.query(node, types)
  if (type) {
    var args = node.arguments
    var params = type[0]
    for (var i = args.length; i--;) {
      var arg = args[i]
      var argType = util.infer(arg, types)
      var paramType = params[i]
      if (argType !== paramType) {
        report.push(util.error.param(i, argType, paramType, arg))
      }
    }
  }
}
