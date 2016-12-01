exports.literal = literal
exports.expression = expression
exports.call = call

// Used for getting type of primitive values
function literal (node) {
  if (node.type !== 'Literal') return null
  return node.value.constructor.name.toString()
}

// Attempt to infer a `ExpressionStatement` type
// Otherwise returns `null` if nothing inferred.
// This usually propagates to `*` type and reports.
function expression (node, ast, sigs) {
  if (node.type !== 'ExpressionStatement') return null
}

// Attempt to infer `CallExpression` return type
// Otherwise returns `null` if nothing inferred.
// This usually propagates to `*` type and reports.
function call (node, ast, sigs) {
  if (node.type !== 'CallExpression') return null
}
