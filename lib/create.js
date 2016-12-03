var util = require('./util')
var parse = require('typling-signature').parse

module.exports = create

function create (node) {
  var types = []
  // Collect signatures from node
  for (var pending = [node], type; pending.length; node = pending.shift()) {
    // Scan current node for signatures
    if (type = scan(node, types)) types.push(type)
    // Walk tree
    util.walk(node, pending)
  }
  return types
}

function scan (node, types) {
  var comments = node.leadingComments, type
  // Find type in comment list and parse it into an object
  for (var i = comments && comments.length; i--;) {
    if (type = parse(comments[i].value)) {
      type.target = node
      return type
    }
  }
  // Walk tree backwards until a return node is found, try to infer return type from that.
  if (node.type === 'FunctionDeclaration') {
    for (var pending = [node]; pending.length;) {
      var sel = pending.pop()
      // In simple terms: A return statement we can infer!
      if (sel.type === 'ReturnStatement' && (type = util.infer(sel.argument, types))) {
        // Create type
        type = [[null], type];
        type.target = node;
        return type
      }
      // Walk tree
      util.walk(sel, pending)
    }
  }
}
