var report = require('../report')
var infer = require('../infer')

var babelLiterals = {
  Number: 'NumericLiteral',
  String: 'StringLiteral',
  Boolean: 'BooleanLiteral',
  Null: 'NullLiteral'
}
function createLiteralDef (type) {
  exports[type] = function (params, node, context) {
    var nodeType = node.type
    var jsType = type.toLowerCase()
    var value = node.value
    if (!(
      (nodeType === babelLiterals[type]) ||
      (nodeType === 'Literal' && ((value === null) ? 'null' : typeof value) === jsType) ||
      (nodeType === 'NewExpression' && (node.callee.type === 'Identifier' && node.callee.value === type))
    )) {
      // console.log(node, type)
      report.mismatch(context, node, type)
    }
  }
}

// Type check various simple literals:
var basic = ['String', 'Number', 'Boolean', 'Null', 'Undefined']
for (var i = basic.length; i--;) createLiteralDef(basic[i])

// Type check Regex
exports.RegExp = function (params, node, context) {
  var type = node.type
  if (!(
    (type === 'RegExpLiteral') ||
    (type === 'Literal' && node.value instanceof RegExp) ||
    (type === 'NewExpression' && (node.callee.type === 'Identifier' && node.callee.value !== 'RegExp'))
  )) {
    report.mismatch(context, node, 'RegExp')
  }
}
