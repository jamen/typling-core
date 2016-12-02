var verify = require('./verify')
var attach = require('./attach')
var assign = require('object-assign')

module.exports = tree

// Analyze a tree for types, scope by scope
// In a way that signatures can be unloaded
// and loaded properly.
function tree (root, presigned) {
  var report = []
  var signed = report.signed = []
  // Add presigned nodes (for dynamic use)
  if (presigned) signed = signed.concat(presigned)
  // Walk tree by pushing nodes to array
  for (var pending = [root]; pending.length;) {
    // Select node and switch depending on type
    var node = pending.shift()
    switch (node.type) {
      // Walk tree by pushing children nodes
      case 'Program':
      case 'BlockStatement':
        { pending.push.apply(pending, node.body); continue }
      case 'ExpressionStatement':
        { pending.push(node.expression); continue }
      // Attach signature to function node (and walk tree stuff)
      case 'FunctionDeclaration':
        { attach(node, signed, report);
          pending.push.apply(pending, node.body); continue }
      // Verify call's arguments with declaration's signature
      case 'CallExpression':
        { verify(node, signed, report); continue }
    }
  }

  return report
}
