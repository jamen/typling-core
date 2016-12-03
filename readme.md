# typling-ast

> Create and verify typling types on Esprima-style ASTs

```js
var esprima = require('esprima')
var typling = require('typling-ast')

var node = esprima.parse(`
  // Number, Number -> Number
  function foo (x, y) { return x + y }
  foo(123, 'hello world')`,
  { attachComment: true })

var types = typling.create(node)
var report = typling.verify(node, types)
// [ TypeError { ... } ]
```

**Warning:** Requires comments to be attached to the nodes with `attachComment: true` or similar

## Installation

```sh
$ npm install --save typling-ast
```

## Usage

### `typling.check(node, [types])`

Analyze a node for types and then verify the calls

### `typling.create(node, [types])`

Get an array of types from the node.  If a signature came from the AST, it will have a `.target` property on it

### `typling.verify(node, types)`

Verify calls against the provided types.  Note this does not analyze signatures in the source.  See `typling.check` for that

### `typling.util`

Small functions for handling Esprima-style ASTs and our `types` array.  You can read [their source](lib/util) to find out more

 - `util.error`: Create friendly, location-aware errors in short ways
 - `util.infer`: Attempt to infer a node's type, optionally give some signatures
 - `util.walk`: Takes various types of nodes, and appends their children into an array
 - `util.query`: Map nodes to types

## License

MIT © [Jamen Marz](https://git.io/jamen)

---

[![version](https://img.shields.io/npm/v/typling-ast.svg?style=flat-square)][package] [![travis](https://img.shields.io/travis/jamen/typling-ast.svg?style=flat-square)](https://travis-ci.org/jamen/typling-ast) [![downloads](https://img.shields.io/npm/dt/typling-ast.svg?style=flat-square)][package] [![license](https://img.shields.io/npm/l/express.svg?style=flat-square)][package] [![follow](https://img.shields.io/github/followers/jamen.svg?style=social&label=Follow)](https://github.com/jamen)

[package]: https://npmjs.org/package/typling-ast
