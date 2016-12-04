var create = require('./create')
var verify = require('./verify')

module.exports = check

function check (node, typlings) {
  // Create typlings from node and concat to any passed in
  typlings = !typlings ? create(node) : create(node).concat(typlings)
  // Verify node with typlings created
  return verify(node, typlings)
}
