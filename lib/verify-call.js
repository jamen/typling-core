var infer = require('./infer')
var ordinal = require('ordinal-numbers')

module.exports = verifyCall

// Verify a `CallExpression` against a signature
// Checks if signature exists and if arguments match.
function verifyCall (node, report, sigs) {
  var name = node.callee.name
  var signature = sigs[name]
  if (!signature) return
  var types = signature[0]

  // Loop through call's parameters
  var params = node.arguments
  for (var i = 0, max = params.length; i < max; i++) {
    var param = params[i]
    var type = infer(param, sigs)

    // Check that type matches
    if (type && type !== types[i]) {
      var message = ordinal(i+1)+' parameter '+type+' should be '+types[i]
      report.push(new TypeError(message))
    } else if (!type) {
      // What should happen with no type?:
      // report.push(new TypeError('No type'))
    }
  }
}
