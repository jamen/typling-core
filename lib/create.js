var infer = require('./util/infer')
var signature = require('typling-signature').parse
var walk = require('estree-walk')
var doctrine = require('doctrine').parse
var fs = require('fs')

module.exports = create

var NOOPTIONS = {}

function create (node, options) {
  options = options || NOOPTIONS

  // Create context:
  var context = {
    definitions: _createDefinitions(options.definitions),
    typlings: options.typlings ? options.typlings.slice(0) : [],
    source: node,
    report: []
  }

  // Create typlings from nodes in tree:
  for (var pending = [node]; pending.length;) {
    var sel = pending.shift(), typling
    if (sel) typling = createNodeTypling(sel, context)
    if (typling) context.typlings.push(typling)
    walk.step(sel, pending)
  }

  return context
}

function createNodeTypling (node, context) {
  var typlings = context.typlings
  var typling = null

  // Try to find typlings in Node's leading comments:
  for (var comments = node.leadingComments, i = comments && comments.length; i--;) {
    var comment = comments[i].value
    // A JSDoc comment with `@typling` field:
    var jsdoc = doctrine('/*'+comment+'*/', { unwrap: true, recoverable: true, tags: ['typling'] })
    if (jsdoc && jsdoc.tags.length) {
      typling = signature(jsdoc.tags[0].description, node)
    }
    // A plain annotated `//@` comment:
    else if (comment[0] === '@') {
      typling = signature(comment.slice(1), node)
    }
  }

  // Try to infer typling from function's return statement:
  if (node.type === 'FunctionDeclaration' && !typling) {
    for (var pending = [node]; pending.length;) {
      var sel = pending.pop()
      if (sel && sel.type === 'ReturnStatement') {
        var type = infer(sel.argument, typlings)
        if (type) typling = [[null], type, node]
      }
      walk.step(sel, pending)
    }
  }

  return typling
}

var _defaultDefinitions = require('./defs')
var _defaultTypes = Object.keys(_defaultDefinitions)
var _maxDefaultTypes = _defaultTypes.length
function _createDefinitions (input) {
  var definitions = {}
  for (var i = 0; i < _maxDefaultTypes; i++) {
    var defaultType = _defaultTypes[i]
    if (!input || !input[defaultType]) {
      definitions[defaultType] = _defaultDefinitions[defaultType]
    }
  }
  if (input) {
    var types = Object.keys(input)
    for (var k = 0, max = types.length; k < max; k++) {
      var type = types[k]
      definitions[input] = input[type]
    }
  }
  return definitions
}
