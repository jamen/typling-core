var isScope = require('./is-scope')
var assign = require('object-assign')
var stripSig = require('./strip-signature')
var infer = require('./infer')
var ordinal = require('ordinal-numbers')

module.exports = tree

// Analyze a tree for types, scope by scope
// In a way that signatures can be unloaded
// and loaded properly.
function tree (root, report, sigs) {
  if (!isScope(root)) return

  // Walk tree and analyze scope-by-scope
  var preparedNodes = [root]
  while (preparedNodes.length > 0) {
    var node = preparedNodes.shift()
    var type = node.type

    // Add type signatures from the node
    var newSigs = stripSig(node)
    if (newSigs) assign(sigs, newSigs)

    // Check if node is scope, and add to nodes list
    if (isScope(node)) preparedNodes.push.apply(preparedNodes, node.body)

    // Check if node is an epxression and add to nodes list
    else if (type === 'ExpressionStatement') preparedNodes.push(node.expression)

    // Check a CallExpression signature
    else if (type === 'CallExpression' && sigs[node.callee.name]) {
      var name = node.callee.name
      var signature = sigs[name]

      // Loop through call's arguments
      var args = node.arguments
      for (var i = 0, max = args.length; i < max; i++) {
        var arg = args[i]
        var inferred

        // Check type for `Literal` argument
        inferred = infer.literal(arg)
        if (inferred && inferred !== signature[i]) {
          var message = ordinal(i+1) + ' parameter ' + inferred + ' should be ' + signature[i]
          report.push(new TypeError(message))
        }

        // TODO: More types of checking
        // i.e. CallExpression
      }
    }
  }
}
