var test = require('tape')
var esprima = require('esprima')
var typling = require('../')

test('context', function (t) {
  t.plan(4)

  var root = esprima.parse(`
  //@ Number, Number -> String
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

  foo(1, 'Hello', 123)
  `, {
    attachComment: true,
    loc: true
  })

  var context = typling.check(root)
  var typlings = context.typlings
  var report = context.report

  // Check typlings
  t.same(typlings[0], [ [ 'Number', 'Number' ], 'String', root.body[0] ], 'plain typling')
  t.same(typlings[1], [ [ 'Number', 'String' ], 'Number', root.body[1] ], 'jsdoc typling')

  // Check first report
  t.same(report[0], {
    name: 'TypeInvalid',
    message: 'foo\'s 2nd parameter should be Number',
    column: 9,
    line: 16
  }, 'report type invalid')

  // Check second report
  t.same(report[1], {
    name: 'TypeMissing',
    message: 'foo\'s 3rd parameter is missing a type',
    column: 18,
    line: 16
  }, 'report type missing')
})
