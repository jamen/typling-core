var util = require('./util')
var ordinal = require('ordinal-numbers')
var walk = require('estree-walk')
var error = util.error

module.exports = verify

function verify (node, typlings) {
  var reports = []

  // Walk tree and report any mismatches against typlings.
  for (var pending = [node]; pending.length;) {
    node = pending.shift()
    if (node.type === 'CallExpression') verifyCall(node, typlings, report)
    walk.step(node, pending)
  }

  return reports
}

function verifyCall (node, typlings, report) {
  // Query `CallExpression` for a typlings
  var typling = util.query(typlings, node)
  if (typling) {
    // Interate over call's arguments
    var args = node.arguments
    var paramTypes = typling[0]
    for (var i = args.length; i--;) {
      var arg = args[i]
      // If arg type does not match param type, report a param error
      var argType = util.infer(arg, typlings)
      var paramType = paramTypes[i]
      if (argType !== paramType) report.push(error.param(i, argType, paramType, arg))
    }
  }
}
