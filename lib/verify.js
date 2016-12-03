var query = require('./query')
var infer = require('./infer')
var ordinal = require('ordinal-numbers')

module.exports = verify

function verify (node, types) {
  // Walk and verify node types.
  for (var pending = [node], report = [], type; pending.length;) {
    node = pending.shift()
    switch (node.type) {
      case 'Program':
      case 'BlockStatement':
        { pending.push.apply(pending, node.body); continue }
      case 'FunctionDeclaration':
      case 'ExpressionStatement':
        { pending.push(node.expression || node.body); continue }
      // Check call expression
      case 'CallExpression':
        { verifyCallExpression(node, types, report);
          pending.push.apply(pending, node.arguments); continue }
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
      var paramType = params[i]
      var arg = args[i]
      var argType = infer(arg, types)
      if (argType !== paramType) {
        var nth = ordinal(i+1)
        var error = new TypeError(nth + ' parameter ' + argType + ' should be ' + paramType)
        error.stack = ''
        if (arg.loc) {
          error.lineNumber = arg.loc.start.line
          error.columnNumber = arg.loc.start.column
        }
        report.push(error)
      }
    }
  }
}
