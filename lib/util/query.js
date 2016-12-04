module.exports = query

function query (typlings, node) {
  switch (node.type || typeof node) {
    case 'CallExpression': {
      for (var i = typlings.length; i--; ) {
          var typling = typlings[i]
          var target = typling[2]
          // If node has target with id, and call name is equal to id name.
          if (target.type === 'FunctionDeclaration' && node.callee.name === target.id.name)
            return typling
      }
    }

    // TODO: Add queries for things like `Identifier`
  }
}
