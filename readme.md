# typling

> Type analysis using comments.

```js
// foo : Number -> Number
function foo (x) {
  return x + 1
}

foo('Hello')
// TypeError: First parameter String should be Number
// TypeError: Return value String should be Number
```

**Warning:** Not ready for production use.

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
  // foo : Number -> Number
  function foo (x) { return x + 1 }  

  foo('Hello')`)

if (report.length)
  console.error(report)
  // [ TypeError { ... },
  //   TypeError { ... } ]
```

#### Parameters

  - `source` (`String`): Some code to analyze for types.
  - `options` (`Object`): Options for typling.
    - TODO: Get options

#### Returns

An array of `TypeError` or `SyntaxError` objects if any occurred, otherwise empty.

## License

MIT © [Jamen Marz](https://git.io/jamen)

---

[![version](https://img.shields.io/npm/v/typling.svg?style=flat-square)][package] [![travis](https://img.shields.io/travis/jamen/typling.svg?style=flat-square)](https://travis-ci.org/jamen/typling) [![downloads](https://img.shields.io/npm/dt/typling.svg?style=flat-square)][package] [![license](https://img.shields.io/npm/l/express.svg?style=flat-square)][package] [![follow](https://img.shields.io/github/followers/jamen.svg?style=social&label=Follow)](https://github.com/jamen)

[package]: https://npmjs.org/package/typling
