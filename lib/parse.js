module.exports = signature

var TYPE_SIGNATURE = /^.+->.+$/
// Parse a signature strip into an object
function signature (value) {
  if (!TYPE_SIGNATURE.test(value)) return null
  var sig = value.split('->')
  if (sig.length > 2) return null
  var params = sig[0].split(',').map(trim)
  var returns = sig[1].trim()
  value = value.trim()
  // Return signatre object from pieces
  return {
    value: value,
    params: params,
    returns: returns
  }
}

// Used in a map
function trim (x) {
  return x.trim()
}
