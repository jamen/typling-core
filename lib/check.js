var create = require('./create')
var verify = require('./verify')

module.exports = function check (node, types) {
  return verify(node, create(node, types))
}
