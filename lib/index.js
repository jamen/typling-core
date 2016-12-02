var acorn = require('acorn')
var attachComments = require('escodegen').attachComments
var analyze = require('./analyze')

module.exports = typling

var NOOPTIONS = {}

// Analyze types of source and
// check calls and references
// returns a report.
function typling (source, options) {
  options = options || NOOPTIONS

  // Parse source with comments
  var comments = [], tokens = []
  var ast = acorn.parse(source, { ranges: true, onComment: comments, onToken: tokens })
  attachComments(ast, comments, tokens)

  // Return data
  return analyze(ast, options.presigned)
}
