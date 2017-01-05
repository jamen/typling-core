var query = require('./query')

module.exports = infer

function infer (node, typlings) {
  switch (node && node.type) {
    // Literals
    case 'Literal':
    case 'StringLiteral':
    case 'NumericLiteral':
    case 'BooleanLiteral':
    case 'NullLiteral':
    case 'RegExpLiteral': {
      if (node.value === null) return 'Null'
      return node.value.constructor.name.toString()
    }

    // Array, object, function, etc.
    case 'ArrayExpression': return 'Array'
    case 'ObjectExpression': return 'Object'
    case 'FunctionDeclaration': return 'Function'

    // Call expression, look if has a return type
    case 'CallExpression': {
      var typling = query(typlings, node)
      if (typling) return typling[1]
      break
    }

    // TODO: ExpressionStatement

    default: return null
  }
}
