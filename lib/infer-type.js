module.exports = inferType

function inferType (node, signatures) {
  var signature
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
      { if (signature = signatures.get(node.callee.name)) return signature[1]; break }

    // TODO: ExpressionStatement
  }
}
