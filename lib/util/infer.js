var query = require('./query')

module.exports = infer

function infer (node, types) {
  var type
  switch (node.type) {
    // Literals
    case 'Literal':
    case 'StringLiteral':
    case 'NumericLiteral':
    case 'BooleanLiteral':
    case 'NullLiteral':
    case 'RegExpLiteral':
      return node.value.constructor.name.toString()

    // Array and object literals
    case 'ArrayExpression': return 'Array'
    case 'ObjectExpression': return 'Object'

    // Call expression, look if has a return type
    case 'CallExpression':
      { if (type = query(node, types)) return type[1]; break }

    // TODO: ExpressionStatement
  }
}
