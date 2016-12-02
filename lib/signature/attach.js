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

    // Attach signature object and push
    if (signature && signature.value !== 'None') {
      node.signature = signature
      signed.push(node)
    }

    // Report missing signature
    if (!signature) report.push(new TypeError('Missing type signature'))
  }

  if (!signature) {
    // Walk tree backwards (?!?) until a return node is found.
    var pending = [node], returnType, originalNode = node
    while (pending.length && !returnType) {
      node = pending.pop()
      switch (node.type) {
        case 'BlockStatement':
          { pending.push.apply(pending, node.body); continue }
        case 'FunctionDeclaration':
        case 'ExpressionStatement':
          { pending.push(node.expression || node.body); continue }
        case 'ReturnStatement':
          { var i = infer(node.argument); if (i) returnType = i; continue }
      }
    }

    if (returnType) {
      node = originalNode
      node.signature = { params: null, returns: returnType }
      signed.push(node)
    }
  }
}
