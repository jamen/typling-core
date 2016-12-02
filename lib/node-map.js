module.exports = nodeMap

function nodeMap (map) {
  // Create map arrays
  map = map ? map.slice(0) : []
  var nodes = map[0] = map[0] ? map[0].slice(0) : []
  var values = map[1] = map[1] ? map[1].slice(0) : []

  // Match node by identifier
  function match (id) {
    for (var i = nodes.length; i--;)
      if (nodes[i] === id || nodes[i].id.name === id)
        return i
  }

  function get (node) {
    var index = match(node)
    return index > -1 ? values[index] : null
  }

  function set (node, value) {
    var index = match(node)
    if (index > -1) {
      values[index] = value
    } else {
      nodes.push(node)
      values.push(value)
    }
  }

  function del (node) {
    var index = match(node)
    if (index > -1) {
      nodes.splice(index, 1)
      values.aplice(index, 1)
      return true
    }
    return false
  }

  return {
    match: match,
    get: get,
    set: set,
    del: del,
    map: map,
    nodes: nodes,
    values: values,
  }
}
