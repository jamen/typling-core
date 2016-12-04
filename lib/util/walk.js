module.exports = walk 

function walk (node, pending) {
  switch (node.type) {
    case 'Program':
    case 'BlockStatement':
      return pending.push.apply(pending, node.body)
    case 'FunctionExpression':
    case 'ExpressionStatement':
      return pending.push(node.expression)
    case 'FunctionDeclaration':
      return pending.push(node.body)
    case 'Property':
      return pending.push(node.value)
    case 'ArrayExpression':
      return pending.push.apply(pending, node.elements)
    case 'ObjectExpression':
      return pending.push.apply(pending, node.propreties)
    case 'CallExpression':
      return pending.push.apply(pending, node.arguments)
  }
}
