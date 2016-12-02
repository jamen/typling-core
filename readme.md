# typling

> Type analysis using comments.

```js
// Number, Number -> Number
function foo (x, y) {
  return x + y
}

foo(1, 'two')
// TypeError: 2nd parameter String should be Number
```

## Installation

```sh
$ npm install --save typling
```

## Usage

### `typling(source, options)`

Analyze types of `source` and returns a report.

#### Examples

```js
var report = typling(`
  // Number -> Number
  function foo (x) { return x + 1 }  

  foo('Hello')`)

if (report.length)
  console.error(report)
  // [ TypeError { ... } ]
```

#### Parameters

  - `source` (`String`): Some code to analyze for types.
  - `options` (`Object`): Options for typling.
    - `presigned` (`Array`): An array of `FunctionDeclaration`-like nodes for preloading signatures.

#### Returns

An array of `TypeError` or `SyntaxError` objects if any occurred, otherwise empty.

The array has a property `.signed` where you can reuse the signatures.

## License

MIT © [Jamen Marz](https://git.io/jamen)

---

[![version](https://img.shields.io/npm/v/typling.svg?style=flat-square)][package] [![travis](https://img.shields.io/travis/jamen/typling.svg?style=flat-square)](https://travis-ci.org/jamen/typling) [![downloads](https://img.shields.io/npm/dt/typling.svg?style=flat-square)][package] [![license](https://img.shields.io/npm/l/express.svg?style=flat-square)][package] [![follow](https://img.shields.io/github/followers/jamen.svg?style=social&label=Follow)](https://github.com/jamen)

[package]: https://npmjs.org/package/typling
