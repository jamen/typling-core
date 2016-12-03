var parse = require('typling-signature').parse

module.exports = create

function create (node, types) {
  // Clone optional signatures parameter
  types = types ? types.slice(0) : []
  // Collect signatures from node
  for (var pending = [node], type; pending.length; node = pending.shift()) {
    // Scan current node for signatures
    if (type = scan(node, types)) types.push(type)
    // Walk tree
    switch (node.type) {
      case 'Program':
      case 'BlockStatement':
        { pending.push.apply(pending, node.body); continue }
      case 'FunctionDeclaration':
      case 'ExpressionStatement':
        { pending.push(node.expression || node.body); continue } } }

  return types
}

function scan (node, types) {
  var comments = node.leadingComments, type

  // Find last signature in comment list and parse it into an object
  for (var i = comments && comments.length; i--;)
    if (type = parse(comments[i].value)) {
      type.target = node
      return type
    }

  // Walk tree backwards until a return node is found, try to infer signature from that.
  if (node.type === 'FunctionDeclaration')
    for (var pending = [node], sel; pending.length; sel = pending.pop())
      switch (sel.type) {
        case 'Program':
        case 'BlockStatement':
          { pending.push.apply(pending, sel.body); continue }
        case 'FunctionDeclaration':
        case 'ExpressionStatement':
          { pending.push(sel.expression || sel.body); continue }
        case 'ReturnStatement':
          { if (type = infer(sel.argument, types))
            { type = [[null], type]; type.target = node; return type } } }
}
