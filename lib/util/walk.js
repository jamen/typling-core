module.exports = function walk (node, pending) {
  switch (node.type) {
    case 'Program':
    case 'BlockStatement':
      return pending.push.apply(pending, node.body)
    case 'FunctionExpression':
    case 'ExpressionStatement':
      return pending.push(node.expression)
    case 'FunctionDeclaration':
      return pending.push(node.body)
  }
}
