var parse = require('../signature/parse')
var infer = require('../analyze/infer')

module.exports = attach

// Attaches a comment signature to a
// `FunctionDeclaration` node. And
// pushes to `signed` for later use.
function attach (node, signed, report) {
  if (node.leadingComments) {
    // Find last signature in comment list
    // Parse it into an object
    var comments = node.leadingComments, signature
    for (var i = comments.length; i-- && !signature;) {
      var possibleSignature = parse(comments[i].value)
      if (possibleSignature) signature = possibleSignature
    }
  }

  // Walk tree backwards (?!?) until a return node is found.
  if (!signature) {
    for (var pending = [node], returns; pending.length && !returns;) {
      var testNode = pending.pop()
      switch (testNode.type) {
        case 'BlockStatement':
          { pending.push.apply(pending, testNode.body); continue }
        case 'FunctionDeclaration':
        case 'ExpressionStatement':
          { pending.push(testNode.expression || testNode.body); continue }
        case 'ReturnStatement':
          { var i = infer(testNode.argument); if (i) returns = i; continue }
      }
    }
    if (returns) signature = { params: ['*'], returns: returns, value: '* : ' + returns }
  }

  // Attach signature object and push
  if (signature && signature.returns !== '<none>') {
    node.signature = signature
    signed.push(node)
  }

  // Report missing signature
  if (!signature) report.push(new TypeError('Missing type signature'))
}
