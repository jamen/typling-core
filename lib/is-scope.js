// Check if node is a scope-type
module.exports = function isScope (node) {
  var type = node.type
  return type === 'Program' ||
         type === 'FunctionDeclaration' ||
         type === 'BlockStatement'
}
