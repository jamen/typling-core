exports.check = require('./lib/check')
exports.create = require('./lib/create')
exports.verify = require('./lib/verify')
exports.util = require('./lib/util')

// var esprima = require('esprima')
//
// var node = esprima.parse(`
// // Number, Number -> Number
// function foo (x, y) { return x + y }
//
// foo(1, 'two')
// `, { attachComment: true, loc: true })
//
// console.log(exports.check(node))
