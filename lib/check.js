var inferType = require('./infer-type')
var ordinal = require('ordinal-numbers')

module.exports = check

var NOOPTIONS = {}

function check (node, options) {
  options = options || NOOPTIONS
  var signatures = options.signatures

  // Walk node
  for (var pending = [node], report = []; pending.length;) {
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
        { var signature = signatures.get(node.callee.name)
          if (signature)
            var args = node.arguments, params = signature[0]
            for (var i = args.length, type; i--;)
              if ((type = inferType(args[i], signatures)) !== params[i])
                paramError(i, type, params[i], report) }
    }
  }

  return report
}

function paramError (i, got, expected, report) {
  report.push(new TypeError(ordinal(i+1)+' parameter '+got+' should be '+expected))
}
