var acorn = require('acorn')
var walk = require('acorn/dist/walk')
var escodegen = require('escodegen')
var uuid = require('uuid')

module.exports = typling

var IS_SIGNATURE = /^.+:[^:]+$/

/**
 * Analyze type for mismatch
 */
function typling (source, options) {
  // Parse with comments:
  var comments = [], tokens = []
  var ast = acorn.parse(source, { ranges: true, onComment: comments, onToken: tokens })
  escodegen.attachComments(ast, comments, tokens)

  // Type signatures
  var fnSigs = ast.fnSigs = {}
  var idSigs = ast.idSigs = {}
  // Different pools for errors
  var errors = []

  // Walk AST
  walk.simple(ast, {
    // Function type definitions
    FunctionDeclaration: fnTypeSig,
    CallExpression: checkFn,
    // Variable type definitions
    VariableDeclaration: idTypeSig,
    Identifier: checkId
  })

  // Load a function's type signature
  // Also attaches and reloads `idSigs` per scope
  function fnTypeSig (node) {
    // Load signature
    var comment = node.leadingComments[0]
    var signature = getSignature(comment)
    if (signature) fnSigs[signature[0]] = signature
  }

  // Checks a call's type signature
  function checkFn (node) {
    var name = node.callee.name
    var signature = fnSigs[name]
    if (signature) {
      var types = signature[1]
      var args = node.arguments
      for (var i = 0, max = args.length; i < max; i++) {
        var arg = args[i]
        switch (arg.type) {
          case 'Literal': {
            if (arg.value.constructor.name.toString() !== types[i])
              errors.push(error(escodegen.generate(node) + ' doesnt match ' + types.join(' -> ')))
            break
          }
        }
      }
    }
  }

  // Load an identifier type signature
  function idTypeSig (node) {}

  // Check an identifier type signature
  function checkId (node) {}

  // Return info
  return errors
}

/**
 * Return a typeerror with lines and columns
 * Used for more accurate tracking (i.e. in linter).
 */
function error (expected, line, col) {
  var err = new TypeError(expected)
  err.lineNumber = line
  err.columnNumber = col
  return err
}

function getSignature (comment) {
  if (comment.type === 'Line' && IS_SIGNATURE.test(comment.value)) {
    var signature = comment.value.split(':')
    signature[0] = signature[0].trim()
    signature[1] = signature[1].split('->')
    var types = signature[1]
    for (var i = 0, max = types.length; i < max; i++) {
      types[i] = types[i].trim()
    }
    return signature
  }
}
