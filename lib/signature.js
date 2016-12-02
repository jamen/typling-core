module.exports = strip

var TYPE_SIGNATURE = /^.+:[^:]+$/

// Strip signature from a node's comments
// Returns plain object of signatures
function strip (node) {
  if (!node.leadingComments) return
  var signatures = {}

  // Loop through leading comments
  var comments = node.leadingComments
  for (var i = 0, max = comments.length; i < max; i++) {
    var comment = comments[i].value
    if (TYPE_SIGNATURE.test(comment)) {
      // Pieces to signature
      var signature = comment.split(':')
      var identifier = signature[0].trim()
      var types = signature[1].split('->')

      // Trim whitespace from types
      for (var j = 0, max2 = types.length; j < max2; j++)
        types[j] = types[j].trim()

      // "Register" signature
      signatures[identifier] = types
    }
  }

  return signatures
}
