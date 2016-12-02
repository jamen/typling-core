var fromCall = require('../signature/from-call')

module.exports = infer

// Attempt to infer a node's type
// Otherwise return `null` if nothing inferred
// This usually leads to a `*` type.
function infer (node, signed) {
  var type = node.type
  if (type === 'Literal') return node.value.constructor.name.toString()
  if (type === 'CallExpression') {
    var signature = fromCall(node, signed)
    if (signature) return signature.returns
  }
  // TODO: ExpressionStatement
}
