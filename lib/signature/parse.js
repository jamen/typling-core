module.exports = signature

var TYPE_SIGNATURE = /^.+:[^:]+$/

// Parse a signature strip into an object
function signature (value) {
  if (!TYPE_SIGNATURE.test(value)) return null
  var sig = value.split(':')
  var params = sig[0].split(',').map(trim)
  var returns = sig[1].trim()
  value = value.trim()
  return {
    value: value,
    params: params,
    returns: returns
  }
}

function trim (x) {
  return x.trim()
}
