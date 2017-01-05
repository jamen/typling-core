var report = require('../util/report')
var infer = require('../util/infer')

var babelLiterals = {
  Number: 'NumericLiteral',
  String: 'StringLiteral',
  Boolean: 'BooleanLiteral',
  Null: 'NullLiteral'
}

// Type check various simple literals:
var basic = ['String', 'Number', 'Boolean', 'Null', 'Undefined']
for (var i = basic.length; i--;) {
  var type = basic[i]
  exports[type] = function (params, node, context) {
    var nodeType = node.type
    var jsType = type.toLowerCase()
    var value = node.value
    if (
      (nodeType !== babelLiterals[type]) &&
      (nodeType === 'Literal' && (value === null ? 'null' : typeof value) !== jsType) &&
      (nodeType ===)
    ) {
      report.mismatch(context, node, type)
    }
  }
}

// Type check Regex
exports.RegExp = function (params, node, context) {
  var type = node.type
  if (
    (type !== 'RegExpLiteral' && (type === 'Literal' && !(node.value instanceof RegExp))) &&
    (type === 'NewExpression' && (node.callee.type === 'Identifier' && node.callee.value === 'RegExp'))
  ) {
    report.mismatch(context, node, 'RegExp')
  }
}
