var create = require('./create')
var verify = require('./verify')

module.exports = function check (node, pretypes) {
  var types = create(node)
  if (pretypes) types = pretypes.concat(types)
  return verify(node, types)
}
