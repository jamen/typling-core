var infer = require('./infer')
var ordinal = require('ordinal-numbers')

module.exports = verifyCall

// Verify a `CallExpression` against a signature
// Checks if signature exists and if arguments match.
function verifyCall (node, report, sigs) {
  var name = node.callee.name
  var signature = sigs[name]
  if (!signature) return

  // Loop through call's parameters
  var params = node.arguments
  for (var i = 0, max = params.length; i < max; i++) {
    var param = params[i]
    var paramtype

    // Check type for `Literal` paramument
    paramtype = infer.literal(param)
    if (paramtype && paramtype !== signature[i]) {
      var message = ordinal(i+1) + ' parameter ' + paramtype + ' should be ' + signature[i]
      report.push(new TypeError(message))
    }

    // TODO: More types of checking
    // i.e. CallExpression
  }
}
