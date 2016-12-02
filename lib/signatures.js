var parse = require('typling-signature').parse
var nodeMap = require('./node-map')
var inferType = require('./infer-type')

module.exports = signatures

var NOOPTIONS = {}

function signatures (node, options) {
  options = options || NOOPTIONS

  // Walk tree and collect signatures
  var signatures = nodeMap(options.signatures)
  for (var pending = [node]; pending.length;) {
    var aNode = pending.shift()
    scan(aNode, signatures)
    switch (aNode.type) {
      case 'Program':
      case 'BlockStatement':
        { pending.push.apply(pending, aNode.body); continue }
      case 'FunctionDeclaration':
      case 'ExpressionStatement':
        { pending.push(aNode.expression || aNode.body); continue } }
  }
  return signatures
}

function scan (node, signatures) {
  var comments = node.leadingComments, signature

  // Find last signature in comment list and parse it into an object
  for (var i = comments && comments.length, pSig; i-- && !signature;)
    if (pSig = parse(comments[i].value)) signature = pSig

  // Walk tree backwards until a return node is found, try to infer signature from that.
  for (var pending = signature && [node]; pending && pending.length && !signature;) {
    var aNode = pending.pop(), x
    switch (aNode.type) {
      case 'Program':
      case 'BlockStatement':
        { pending.push.apply(pending, aNode.body); continue }
      case 'FunctionDeclaration':
      case 'ExpressionStatement':
        { pending.push(aNode.expression || aNode.body); continue }
      case 'ReturnStatement':
        { if (x = inferType(aNode.argument, signatures)) signature = [['*'], x]; continue } } }

  // Set signature
  if (signature) signatures.set(node, signature)
}
