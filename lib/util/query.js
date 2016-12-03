module.exports = query

function query (node, types) {
  switch (node.type || typeof node) {
    case 'CallExpression':
      { for (var i = types.length; i--; ) {
          var type = types[i]
          if (type.target && node.callee.name === type.target.id.name)
            return type } }

    // TODO: Add queries for things like `Identifier`
  }
}
