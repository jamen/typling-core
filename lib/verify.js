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
        { if (type = query(node, types))
            var args = node.arguments, params = type[0]
            for (var i = args.length, rt; i--;) {
              console.log(args[i], params[i])
              if ((rt = infer(args[i], types)) !== params[i])
                paramError(i, rt, params[i], report); continue } }
    }
  }

  return report
}

function paramError (i, got, expected, report) {
  report.push(new TypeError(ordinal(i+1)+' parameter '+got+' should be '+expected))
}
