module.exports = signatureFromCall

// Get signature from a call and a list of signed nodes
function signatureFromCall (node, signed) {
  var declaration
  for (var i = signed.length; i-- && !declaration;) {
    var possibleDecl = signed[i]
    if (node.callee.name === possibleDecl.id.name)
      return possibleDecl.signature
  }
}
