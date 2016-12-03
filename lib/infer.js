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
      { return node.value.constructor.name.toString() }

    // Call expression, look if signature exists
    case 'CallExpression':
      { if (type = query(node, types)) return type[1]; break }

    // TODO: ExpressionStatement
  }
}
