var isScope = require('./is-scope')
var stripSig = require('./signature')
var infer = require('./infer')
var verifyCall = require('./verify-call')
var assign = require('object-assign')
var ordinal = require('ordinal-numbers')

module.exports = analyze

// Analyze a tree for types, scope by scope
// In a way that signatures can be unloaded
// and loaded properly.
function analyze (root) {
  if (!isScope(root)) return
  var report = [], sigs = {}

  // Walk tree and analyze scope-by-scope
  var preparedNodes = [root]
  while (preparedNodes.length > 0) {
    var node = preparedNodes.shift()
    var type = node.type

    // Add type signatures from the node
    var newSigs = stripSig(node)
    if (newSigs) assign(sigs, newSigs)

    // Add a scope node to node list
    if (isScope(node)) preparedNodes.push.apply(preparedNodes, node.body)

    // Add ExpressionStatement to node list
    else if (type === 'ExpressionStatement') preparedNodes.push(node.expression)

    // Verify a CallExpression signature
    else if (type === 'CallExpression') verifyCall(node, report, sigs)
  }

  // Reurn data
  return [report, sigs]
}
