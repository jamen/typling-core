var walk = require('estree-walk')

module.exports = query
query.fromName = fromName

function query (typlings, node) {
  var typling
  switch (node.type || typeof node) {
    case 'CallExpression': {
      if (typling = fromName(typlings, node.callee.id)) return typling
      break
    }

    // TODO: Add queries for things like `Identifier`
  }
}

function fromName (typlings, name) {
  for (var i = typlings.length; i--; ) {
    var typling = typlings[i]
    var target = typling[2]
    var type = target.type
    if (
      (type === 'FunctionDeclaration' && target.id.name === name) ||
      (typeof target === 'string' && target === name)
    ) {
      return typling
    }
    if (type === 'ImportDeclaration') {
      var specifiers = target.specifiers
      for (var i = 0, max = specifiers.length; i < max; i++) {
        var specifier = specifiers[i]
        if (
          (specifier.type === 'ImportSpecifier' && specifier.imported.value === name) ||
          (specifier.type === 'ImportDefaultSpecifier' && specifier.local.value === name) ||
          (specifier.tyoe === 'ImportNamespaceSpecifier' && specifier.local.value === name)
        ) {
          return typling
        }
      }
    }
  }
}
