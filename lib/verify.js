var ordinal = require('ordinal-numbers')
var walk = require('estree-walk')
var report = require('./util/report')
var query = require('./util/query')

module.exports = verify

function verify (context) {
  var node = context.source
  var typlings = context.typlings
  var definitions = context.definitions

  // Walk tree and report any mismatches against typlings.
  for (var pending = [node]; pending.length;) {
    node = pending.shift()
    if (node && node.type === 'CallExpression') {
      // Query `CallExpression` for a typlings
      var typling = query(typlings, node)
      if (typling) {
        // Interate over call's arguments
        var args = node.arguments
        var paramTypes = typling[0]
        for (var i = 0, max = args.length; max > i; i++) {
          var arg = args[i]
          var paramType = paramTypes[i] || ''
          var complexBracket = paramType.indexOf('<')
          if (complexBracket > -1) {
            var typeName = paramType.slice(0, complexBracket)
            var typeParams = paramType.slice(complexBracket + 1, -1).split(',')
            for (var i = 0, max = typeParams.length; i < max; i++)
              typeParams[i] = typeParams[i].trim()
          } else {
            var typeName = paramType
          }
          var definition = definitions[typeName]
          if (!paramType) report.notype(context, arg, i)
          else if (!definition) report.nodef(context, arg, typeName)
          else definition(typeParams, arg, context)
        }
      }
    }
    walk.step(node, pending)
  }

  return context
}
