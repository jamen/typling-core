### Typling

A typling is the full string associating [types](#types) to a function's parameters and return value.

```js
// This bit is a typling:
//@ Number, String -> Boolean
function foo (x, y) {
  // ...  
}
```

This also works on constructors, methods, and callbacks, because they functions too

### Types

Types are the individual units in a typling, i.e. `Number`, `String`, etc.

There is also "complex types" which can give more type info to typling's [strategies](#strategy), which allow them to check methods.  These can be added in a modular way to support any library.

```js
//@ Number -> Promise<String>
function foo (a) {
  // Strategy can attempt to check both return types:
  return Promise.resolve(a.toString())
}

foo(123).then(function (value) {
  // Strategy can associate `value` as type `String`.
})
```

Another example: `Array<String>` and `.map`/`.filter`/`.reduce`/etc. callbacks.

### Strategy

A strategy is an object that maps type names (e.g. `'Promise'`, `'Boolean'`) to a function that typechecks. Optional params add complexity to the checking, and the context is the source node, other strategies, and reports.

```js
function Promise (params, node, context) {
  // Typecheck `node` using `params` and `context`.
}
```
