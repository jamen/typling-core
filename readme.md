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
 - `verify`: Verify typlings (probably from `create`) against a tree of nodes, returning an array of errors if any.
 - `check`: A type checking function for nodes. Shortcut for `create` then `verify` on the same node.  

**Notice:** Typling requires comments to be attached to the nodes with Esprima's `attachComment` option (or similar in others)

## Installation

```sh
$ npm install --save typling-core
```

## Usage

### `typling.check(node, [typlings])`

Check tree of nodes for typlings then type errors.  Returns an array of `TypeError`.

```js
var node = esprima.parse(`
  // Number, Number -> Number
  function foo (x, y) { return x + y }
  foo(1, 'two')`)

typling.check(node)
// [ { [TypeError: 2nd parameter String should be Number] ... } ]
```

Optionally add some typlings to the ones parsed with a second parameter.

### `typling.create(node)`

Create an array of typlings from a tree of nodes.

```js
var types = typling.create(node)
// [ [['Number'], 'Number', FunctionDeclaration { ... }]
//   [['String', 'Number'], 'String'], ProgramModule { ... }]
```

Typlings come in the form:

```
[paramTypes, returnType, node?]
```

With `node` be the node it originates from, or `undefined`/`null`.

### `typling.verify(node, typlings)`

Verify typlings against a tree of nodes.  Note that this doesn't analyze typlings out of the tree.

```js
typling.verify(types, node)
// [ TypeError { ... },
//   TypeError { ... },
//   TypeError { ... } ]
```

### `typling.util`

Functions for handling the `typlings` array.  You can read [their source](lib/util) to find out more

 - `util.error`: Creating descriptive errors that reference back to a node.
 - `util.infer`: Try to infer a nodes type. (Typlings not required to infer all nodes, but help)
 - `util.query`: Query `typlings` for a typling, given a node to search with.

## License

MIT © [Jamen Marz](https://git.io/jamen)

---

[![version](https://img.shields.io/npm/v/typling-core.svg?style=flat-square)][package] [![travis](https://img.shields.io/travis/jamen/typling-core.svg?style=flat-square)](https://travis-ci.org/jamen/typling-core) [![downloads](https://img.shields.io/npm/dt/typling-core.svg?style=flat-square)][package] [![license](https://img.shields.io/npm/l/express.svg?style=flat-square)][package] [![follow](https://img.shields.io/github/followers/jamen.svg?style=social&label=Follow)](https://github.com/jamen)

[package]: https://npmjs.org/package/typling-core
