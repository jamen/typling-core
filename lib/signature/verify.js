var infer = require('../analyze/infer')
var fromCall = require('../signature/from-call')
var ordinal = require('ordinal-numbers')

module.exports = verify

// Verify a `CallExpression` against a signature
// Checks if signature exists and if arguments match.
function verify (node, signed, report) {
  var signature = fromCall(node, signed)
  var args = node.arguments
  var params = signature.params

  // Loop call arguments and match against signature params
  for (var i = 0, max = args.length; i < max; i++) {
    var expected = params[i]
    var arg = args[i]
    var type = infer(arg, signed)

    // Report mismatch type
    if (type && type !== expected) {
      report.push(new TypeError(ordinal(i+1)+' argument '+type+' should be '+expected))
    }
  }
}
