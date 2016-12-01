var acorn = require('acorn')
var attachComments = require('escodegen').attachComments
var tree = require('./tree')

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

  // Fill this with any errors
  var report = []
  // Type signatures
  var signatures = {}

  // Check tree
  tree(ast, report, signatures)

  // Return errors
  return report
}
