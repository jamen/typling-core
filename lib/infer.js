module.exports = infer

// Attempt to infer a node's type
// Otherwise return `null` if nothing inferred
// This usually leads to a `*` type.
function infer (node, signed) {
  var type = node.type
  if (type === 'Literal') return node.value.constructor.name.toString()
  if (type === 'CallExpression') {
    // Find matching declaration to call
    var declaration
    for (var i = signed.length; i-- && !declaration;) {
      var possibleDecl = signed[i]
      if (node.callee.name === possibleDecl.id.name)
        declaration = possibleDecl
    }

    // Return type
    return declaration.signature.returns
  }
  // TODO: ExpressionStatement
}
