# typling-core

> Check typlings on Esprima-style AST

This is for using typling as a module.  See [`typling`](https://github.com/jamen/typling) for using as a tool.

```js
var esprima = require('esprima')
var typling = require('typling-core')

var source = esprima.parse(
  `//@ Number, Number -> Number
   function foo (x, y) {
     return x + y
   }

   foo(123, 'hello world')`,
   { attachComment: true, loc: true }
 )

var result = typling.check(source)

console.log(result.report)
console.log(result.source)
// ...
```

There are 3 functions you can use with `typling`:

 - `check(source, options?)`: Create context and generate reports. (`create` and `verify` combined)
 - `create(source, options?)`: Create context with typlings, definitions, source, and no reports.
 - `verify(context)`: Generate reports on the context.

**Notice:** Nodes must have comments attached, and optionally locations for line/column in reports.  Use `{ attachComment: true, loc: true }` with `esprima`, or similar in others.

## Installation

```sh
$ npm install --save typling-core
```

## Usage

### `typling.check(source, options?)`

Type check the node, and return a context object with all the results.

- `source` ([estree `Node`](https://github.com/estree/estree/blob/master/es5.md#node-objects)): A Node (preferably [`Program`](https://github.com/estree/estree/blob/master/es5.md#programs)) created from any ESTree-compatible parser.
- `options` (`Object`): Options object for creating context.  Optional.
- `options.definitions` (`Object`): An object mapping type names (e.g. `String`, `Number`) to a type definition. Has [built-in definitions](lib/defs/)
- `options.typlings` (`Array`): Preloading typlings.  Typlings from the node are added in.

```js
// Create context and generate reports:
var result = typling.check(node)

// Result is context object:
console.log(result.report)
console.log(result.source)
```

This is `typling.create` and `typling.verify` turned into one step if you want simple type checker.

### `typling.create(source, options?)`

Create a context object.  Contains `definitions`, `typlings`, `source`, `report`.  Same options as `typling.check`

```js
// Create context (generates typlings):
var context = typling.create(node)

// Has necessary props, with no report
console.log(context.typlings)
console.log(context.definitions)
// ...
```

**Note:** `report` will be empty until you use `typling.verify` or use `typling.check` instead.

### `typling.verify(context)`

Verify a context from `typling.create`. Creates objects on `report`, otherwise empty.

```js
// Create context, and cache typligns
var context = typling.create(node)
var typlings = context.typlings

// Verify context
typling.verify(context)

// Log any reports:
console.log(context.reports)
```

## License

MIT © [Jamen Marz](https://git.io/jamen)

---

[![version](https://img.shields.io/npm/v/typling-core.svg?style=flat-square)][package] [![travis](https://img.shields.io/travis/jamen/typling-core.svg?style=flat-square)](https://travis-ci.org/jamen/typling-core) [![downloads](https://img.shields.io/npm/dt/typling-core.svg?style=flat-square)][package] [![license](https://img.shields.io/npm/l/express.svg?style=flat-square)][package] [![follow](https://img.shields.io/github/followers/jamen.svg?style=social&label=Follow)](https://github.com/jamen)

[package]: https://npmjs.org/package/typling-core
