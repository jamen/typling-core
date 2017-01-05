var util = require('./util')
var signature = require('typling-signature').parse
var walk = require('estree-walk')
var doctrine = require('doctrine').parse
var fs = require('fs')

module.exports = create

var NOOPTIONS = {}

function create (node, options) {
  options = options || NOOPTIONS
  var typlings = options.typlings ? options.typlings.slice(0) : []

  // Load comments and such from nodes in tree as typlings
  for (var pending = [node]; pending.length;) {
    var sel = pending.shift()
    var typling = getNodeTypling(sel, typlings)
    if (typling) typlings.push(typling)
    walk.step(sel, pending)
  }

  return typlings
}

// Attempts to get a typling from a node
// Optionally give it typlings to help with inferring
function getNodeTypling (node, typlings) {
  var typling = null

  // Find typling in comment list and parse it into an object
  var comments = node.leadingComments
  for (var i = comments && comments.length; i--;) {
    var comment = comments[i].value

    // A JSDoc comment with `@typling` field
    var jsdoc = doctrine('/*'+comment+'*/', { unwrap: true, recoverable: true, tags: ['typling'] })
    if (jsdoc && jsdoc.tags.length) typling = signature(jsdoc.tags[0].description, node)

    // A plain leading comment
    else typling = signature(comment, node)
  }

  // If node is a function, try to infer typling from the return statement
  if (node.type === 'FunctionDeclaration' && !typling) {
    for (var pending = [node], type; pending.length;) {
      var sel = pending.pop()

      // The node is a return statement that we can infer the type of
      if (sel.type === 'ReturnStatement' && (type = util.infer(sel.argument, typlings))) {
        typling = [[null], type, node]
      }

      walk.step(sel, pending)
    }
  }

  return typling
}
