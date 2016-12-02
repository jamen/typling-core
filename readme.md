# es-typling

> Analyze Esprima-style ASTs for signatures and type errors.

```js
var esprima = require('esprima')
var typling = require('es-typling')

var node = esprima.parse(`
  // Number, Number -> Number
  function foo (x, y) { return x + y }
  foo(123, 'hello world')`,
  { attachComment: true })

var signatures = typling.signatures(node)
var report = typling.check(node, { signatures })
```

**Warning:** Requires comments to be attached to the nodes with `attachComment: true` or similar.

## Installation

```sh
$ npm install --save es-typling
```

## Usage

### `typling.signatures(node, [options])`

Create a map of nodes to signatures.

### `typling.check(node, [options])`

Check node with `options.signatures` (exported from `typling.signatures`).

### `typling.inferType(node, signatures)`

Infer the type of node

### `typling.nodeMap([map])`

Create a node map, returned by `typling.signatures`

## License

MIT © [Jamen Marz](https://git.io/jamen)

---

[![version](https://img.shields.io/npm/v/es-typling.svg?style=flat-square)][package] [![travis](https://img.shields.io/travis/jamen/es-typling.svg?style=flat-square)](https://travis-ci.org/jamen/es-typling) [![downloads](https://img.shields.io/npm/dt/es-typling.svg?style=flat-square)][package] [![license](https://img.shields.io/npm/l/express.svg?style=flat-square)][package] [![support me](https://img.shields.io/badge/support%20me-patreon-green.svg?style=flat-square)]() [![follow](https://img.shields.io/github/followers/jamen.svg?style=social&label=Follow)](https://github.com/jamen)

[package]: https://npmjs.org/package/es-typling
