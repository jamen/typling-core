var infer = require('./infer')
var signature = require('./signature')
var walk = require('estree-walk')
var doctrine = require('doctrine').parse
var fs = require('fs')
var EMPTY_OBJECT = {}

module.exports = create

function create (source, options) {
  options = options || EMPTY_OBJECT

  // Create context:
  var context = {
    definitions: Object.assign({}, require('./defs'), options.definitions),
    typlings: options.typlings ? options.typlings.slice(0) : [],
    source: source,
    report: []
  }

  // Create typlings from nodes in tree:
  walk(source, function (node) {
    if (node) {
      var typling =
        commentTypling(node, context) ||
        returnTypling(node, context)

      if (typling) {
        context.typlings.push(typling)
      }
    }
  })

  return context
}

function commentTypling (node, context) {
  var typlings = context.typlings
  for (var comments = node.leadingComments, i = comments && comments.length; i--;) {
    var comment = comments[i].value
    // A JSDoc comment with `@typling` field:
    var jsdoc = doctrine('/*'+comment+'*/', { unwrap: true, recoverable: true, tags: ['typling'] })
    if (jsdoc && jsdoc.tags.length) return signature(jsdoc.tags[0].description, node)
    // A plain annotated `//@` comment:
    else if (comment[0] === '@') return signature(comment.slice(1), node)
  }
}

function returnTypling (node, context) {
  if (node.type === 'FunctionDeclaration') {
    var typling
    walk(node, ['ReturnStatement'], function (sel) {
      var type = infer(sel.argument, context.typlings)
      if (type) typling = [[null], type, node]
    })
    if (typling) return typling
  }
}
