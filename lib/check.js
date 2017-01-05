var create = require('./create')
var verify = require('./verify')

module.exports = function check (node, options) {
  return verify(create(node, options))
}
