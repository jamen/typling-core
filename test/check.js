var test = require('tape')
var typling = require('../')
var esprima = require('esprima')
var espree = require('espree')
var babylon = require('babylon')
var acorn = require('acorn')

var source =
  '// Number, Number -> Number\n' +
  'function foo (x, y) { return x + y }\n' +
  'foo(1, 2); foo(); foo(1, "two")\n' +
  '// String, Number -> String\n' +
  'function bar (x, y) { return x + x + y }\n' +
  'bar("foo", foo(1, 2)); bar("bar", foo(1, "foo"))\n' +
  'bar("foo", 123); bar(123, "foo")\n'

// function shared (t, node) {
//   var report = typling.check(node)
//   t.same(report, [])
// }
//
// test('esprima checks', function (t) {
//   var node = esprima.parse(source, { attachComment: true, loc: true })
//
//   shared(t, node)
// })
