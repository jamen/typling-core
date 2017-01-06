module.exports = parse
// exports.parse = parse
// exports.generate = generate

// Parse a signature strip into a signature object
function parse (strip, associate) {
  var signature = strip.split('->')
  if (signature.length !== 2) return null

  // Param types:
  var params = signature[0].split(',')
  for (var i = params.length; i--;) {
    var p = params[i].trim()
    if (p === '*') params[i] = null
    else params[i] = p
  }

  // Return type:
  var returns = signature[1].trim()
  if (returns === '*') returns = null

  return associate
    ? [params, returns, associate]
    : [params, returns]
}

// Generate a signature strip from a signature object
// function generate (signature) {
//   // Param types:
//   var params = signature[0].slice(0)
//   for (var i = params.length; i--;)
//     if (!params[i]) params[i] = '*'
//
//   // Return type:
//   var returns = !signature[1] ? '*' : signature[1]
//
//   // Signature:
//   return params.join(', ') + ' -> ' + returns
// }
