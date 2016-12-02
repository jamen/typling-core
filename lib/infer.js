module.exports = infer

// Attempt to infer a node's type
// Otherwise return `null` if nothing inferred
// This usually leads to a `*` type.
function infer (node, sigs) {
  var type = node.type
  if (type === 'Literal') return node.value.constructor.name.toString()
  if (type === 'CallExpression') {
    var name = node.callee.name
    var signature = sigs[name]
    if (!signature) return null
    return signature[1]
  }
  // TODO: ExpressionStatement
}
