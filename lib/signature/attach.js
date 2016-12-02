var parse = require('../signature/parse')

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

  // TODO: Attempt to infer a signature from the return statement
}
