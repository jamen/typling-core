var util = require('./util')
var parse = require('typling-signature').parse

module.exports = create

function create (node) {
  var typlings = []

  // Walk tree and try to get typlings
  for (var pending = [node]; pending.length;) {
    node = pending.shift()

    // If has typling, push it to typlings array
    var typling = getTypling(node, typlings)
    if (typling) typlings.push(typling)

    util.walk(node, pending)
  }

  return typlings
}

/**
 * Attempts to get a typling from a node
 * Optionally give it typlings to help with inferring
 */
function getTypling (node, typlings) {
  var typling = null

  // Find typling in comment list and parse it into an object
  var comments = node.leadingComments
  for (var i = comments && comments.length; i--;) {
    if (typling = parse(comments[i].value)) typling[2] = node
  }

  // If node is a function, try to infer typling from the return statement
  if (node.type === 'FunctionDeclaration' && !typling) {
    for (var pending = [node], type; pending.length;) {
      var sel = pending.pop()

      // The node is a return statement that we can infer the type of
      if (sel.type === 'ReturnStatement' && (type = util.infer(sel.argument, typlings))) {
        typling = [[null], type, node]
      }

      util.walk(sel, pending)
    }
  }

  return typling
}
