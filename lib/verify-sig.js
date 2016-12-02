var infer = require('./infer')
var ordinal = require('ordinal-numbers')

module.exports = verify

// Verify a `CallExpression` against a signature
// Checks if signature exists and if arguments match.
function verify (node, signed, report) {
  // Find matching declaration to call
  var declaration
  for (var i = signed.length; i-- && !declaration;) {
    var possibleDecl = signed[i]
    if (node.callee.name === possibleDecl.id.name)
      declaration = possibleDecl
  }

  var signature = declaration.signature
  var args = node.arguments
  var params = signature.params

  for (var a = 0, max = args.length; a < max; a++) {
    var arg = args[a]
    var type = infer(arg)
    var expected = params[a]
    if (type && type !== expected) {
      // Report mismatch type
      var message = ordinal(a+1)+' argument '+type+' should be '+expected
      report.push(new TypeError(message))
    }
  }
}
