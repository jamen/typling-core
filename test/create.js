var test = require('tape')
var esprima = require('esprima')
var typling = require('../')

test('create signatures', function (t) {
  t.plan(2)

  var root = esprima.parse(`
  // Number, Number -> String
  function foo (x, y) {
    return x + y
  }

  /**
   * Hello world
   * @param {String} a
   * @typling Number, String -> Number
   */
  function bar (a, b) {
    return a - b
  }
  `, {
    attachComment: true
  })

  var typlings = typling.create(root)
  t.same(typlings[0], [ [ 'Number', 'Number' ], 'String', root.body[0] ], 'plain typling')
  t.same(typlings[1], [ [ 'Number', 'String' ], 'Number', root.body[1] ], 'jsdoc typling')
})
