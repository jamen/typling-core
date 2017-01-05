var parentNode = require('estree-ancestors').parent
var ordinal = require('ordinal-numbers')

exports.mismatch = function mismatch (context, node, expected) {
  var loc = node.loc
  var call = parentNode(node, context.source)
  var nth = ordinal(call.arguments.indexOf(node) + 1)
  context.report.push({
    name: 'TypeInvalid',
    message: nth + ' parameter should be ' + expected,
    line: loc ? loc.start.line : null,
    column: loc ? loc.start.column : null
  })
}

exports.nodef = function nodef (context, node, expected) {
  var loc = node.loc
  context.report.push({
    name: 'DefinitionMissing',
    message: 'Type definition ' + expected + ' was not found.',
    line: loc ? loc.start.line : null,
    column: loc ? loc.start.column : null
  })
}

exports.notype = function notype (context, node, i) {
  var loc = node.loc
  context.report.push({
    name: 'TypeMissing',
    message: ordinal(i + 1) + ' parameter is missing a type',
    line: loc ? loc.start.line : null,
    column: loc ? loc.start.column : null
  })
}
