var query = require('./query')

module.exports = infer

function infer (node, typlings) {
  switch (node.type) {
    // Literals
    case 'Literal':
    case 'StringLiteral':
    case 'NumericLiteral':
    case 'BooleanLiteral':
    case 'NullLiteral':
    case 'RegExpLiteral':
      return node.value.constructor.name.toString()

    // Array and object expressions
    case 'ArrayExpression': return 'Array'
    case 'ObjectExpression': return 'Object'

    // Call expression, look if has a return type
    case 'CallExpression': {
      var typling = query(typlings, node)
      if (typling) return typling[1]
      break
    }

    // TODO: ExpressionStatement
  }
}
