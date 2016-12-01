# type-analyze [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

> Statically analyze types through comments

```js
// foo : Number -> Number
function foo (x) {
  return x + 1
}

foo('Hello')
// TypeError: foo('Hello') doesnt match Number -> Number
```

This module is a work in progress:

 - [x]: Loads function type signature
 - [x]: Checks literal types on function calls
 - [ ]: Wildcards in type signature using `*`
 - [ ]: Infers types of expressions (in functions and identifiers)
 - [ ]: Loads identifier type signature
 - [ ]: Checks identifier types
 - [ ]: Proper support for scopes

## Installation

```sh
$ npm install --save type-analyze
```

## Usage

### `analyze(source, options)` -> `errors`

Analyze `source` with `options`.

```js
var errors = analyze(`
// foo : Number -> Number
function foo (x) { return x + 1 }  

foo('Hello')
`)

console.error(errors)
// [ TypeError { ... } ]
```

### 'errors'

An array of `TypeError` objects.

## License

MIT © [Jamen Marz](https://git.io/jamen)

---

[![version](https://img.shields.io/npm/v/type-analyze.svg?style=flat-square)][package] [![travis](https://img.shields.io/travis/jamen/type-analyze.svg?style=flat-square)](https://travis-ci.org/jamen/type-analyze) [![downloads](https://img.shields.io/npm/dt/type-analyze.svg?style=flat-square)][package] [![license](https://img.shields.io/npm/l/express.svg?style=flat-square)][package] [![follow](https://img.shields.io/github/followers/jamen.svg?style=social&label=Follow)](https://github.com/jamen)

[package]: https://npmjs.org/package/type-analyze
