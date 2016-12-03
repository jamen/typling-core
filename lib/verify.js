var util = require('./util')
var ordinal = require('ordinal-numbers')
var error = util.error

module.exports = verify

function verify (types, node) {
  var report = []
  // Walk and verify node types.
  for (var pending = [node]; pending.length;) {
    node = pending.shift()
    // Verify call expression
    if (node.type === 'CallExpression') verifyCall(types, node, report)
    // Walk tree
    util.walk(node, pending)
  }
  return report
}

function verifyCall (types, node, report) {
  // Query `CallExpression` for a type
  var type = util.query(node, types)
  if (type) {
    // Match parameter types against argument types
    var args = node.arguments
    var params = type[0]
    for (var i = args.length; i--;) {
      var arg = args[i]
      var argType = util.infer(arg, types)
      var paramType = params[i]
      // If arg type does not match param type, report a param error.
      if (argType !== paramType) report.push(error.param(i, argType, paramType, arg))
    }
  }
}
