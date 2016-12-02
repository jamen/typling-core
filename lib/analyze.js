var verify = require('./verify-sig')
var attach = require('./attach-sig')
var assign = require('object-assign')

module.exports = analyze

// Analyze a tree for types, scope by scope
// In a way that signatures can be unloaded
// and loaded properly.
function analyze (root) {
  // This arrays stays empty or fills with TypeError
  var report = []
  // For stashing `FunctionDeclaration` nodes with signatures
  var signed = []

  // Walk tree by pushing child nodes to `pending`
  var pending = [root]
  while (pending.length > 0) {
    // Select node and switch depending on type
    var node = pending.shift()
    switch (node.type) {
      // Attach a function's signature to the node
      // And put children in pending node list
      case 'FunctionDeclaration':
        { attach(node, signed, report);
          pending.push.apply(pending, node.body); continue }

      // Verify a call matches its declaration's signature
      case 'CallExpression':
        { verify(node, signed, report); continue }

      // Put block-like nodes' children in pending nodes list
      // This does a lot of the tree's walking
      case 'Program':
      case 'BlockStatement':
        { pending.push.apply(pending, node.body); continue }
      case 'ExpressionStatement':
        { pending.push(node.expression); continue }
    }
  }

  // Return report
  return report
}
