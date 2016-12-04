# typling-core

> Create and verify typlings on Esprima-style nodes

```js
var esprima = require('esprima')
var typling = require('typling-core')

var node = esprima.parse(
  `// Number, Number -> Number
   function foo (x, y) { return x + y }
   foo(123, 'hello world')`,
   { attachComment: true }
 )

var types = typling.create(node)
var report = typling.verify(node, types)
// [ TypeError { ... } ]
```

Takes Esprima-style nodes (see [Estree](https://github.com/estree/estree)) and can do 3 things of your choosing:

 - `create`: Parses typlings (e.g. `// String -> String`) into array of types that optionally point back to the nodes.
 - `verify`: Verify some types (probably from `create`) against a node tree, returning an array of errors to handle.
 - `check`: A type checking function for nodes. Shortcut for `create` then `verify` on the same node.  

**Notice:** Requires comments to be attached to the nodes with `attachComment: true` or similar

## Installation

```sh
$ npm install --save typling-core
```

## Usage

### `typling.check(node, [types])`

Check tree of nodes for types then type errors.  Returns an array of `TypeError`, otherwise empty.

```js
var node = esprima.parse(`
  // Number, Number -> Number
  function foo (x, y) { return x + y }
  foo(1, 'two')`)

typling.check(node)
// [ { [TypeError: 2nd parameter String should be Number] ... } ]
```

Optionally add some additional types with the second parameter.

### `typling.create(node)`

Create an array of types from a tree of Esprima-style nodes.  These types have a `.target` property pointing to the node they come from.

```js
var types = typling.create(node)
// [ [['Number'], 'Number', target: FunctionDeclaration { ... }]
//   [['String', 'Number'], 'String'], target: ProgramModule { ... }]
```

### `typling.verify(types, node)`

Verify calls in node tree against types.

```js
typling.verify(types, node)
// [ TypeError { ... },
//   TypeError { ... },
//   TypeError { ... } ]
```

### `typling.util`

Small functions for handling Esprima-style ASTs and our `types` array.  You can read [their source](lib/util) to find out more

 - `util.error`: Create friendly, location-aware errors in short ways
 - `util.infer`: Attempt to infer a node's type, optionally give some signatures
 - `util.walk`: Takes various types of nodes, and appends their children into an array
 - `util.query`: Map nodes to types

## License

MIT © [Jamen Marz](https://git.io/jamen)

---

[![version](https://img.shields.io/npm/v/typling-core.svg?style=flat-square)][package] [![travis](https://img.shields.io/travis/jamen/typling-core.svg?style=flat-square)](https://travis-ci.org/jamen/typling-core) [![downloads](https://img.shields.io/npm/dt/typling-core.svg?style=flat-square)][package] [![license](https://img.shields.io/npm/l/express.svg?style=flat-square)][package] [![follow](https://img.shields.io/github/followers/jamen.svg?style=social&label=Follow)](https://github.com/jamen)

[package]: https://npmjs.org/package/typling-core
