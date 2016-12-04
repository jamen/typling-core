module.exports = query

function query (node, types) {
  switch (node.type || typeof node) {
    case 'CallExpression':
      { for (var i = types.length; i--; ) {
          var type = types[i]
          var target = type.target
          // If node has target with id, and call name is equal to id name.
          if (target && target.id && node.callee.name === type.target.id.name) return type
      } }

    // TODO: Add queries for things like `Identifier`
  }
}
