var test = require('tape')
var signature = require('../lib/signature')

test('signature parses', function (t) {
  t.plan(5)

  t.same(
    signature('Number -> Number'),
    [['Number'], 'Number'],
    'one parameter'
  )

  t.same(
    signature('Number, Number, Number -> Number'),
    [['Number', 'Number', 'Number'], 'Number'],
    'three parameters'
  )

  t.same(
    signature('Number    , Number   -> Number'),
    [['Number', 'Number'], 'Number'],
    'trims whitespace'
  )

  t.same(
    signature('Number, * -> *'),
    [['Number', null], null],
    'replaces star with null'
  )


  t.same(
    signature('String -> String', 123),
    [['String'], 'String', 123],
    'with associate parameter'
  )
})

// test('generates signature strips', function (t) {
//   t.plan(3)
//
//   t.same(
//     signature.generate([['Promise'], 'Promise']),
//     'Promise -> Promise',
//     'generates one parameter strips'
//   )
//
//   t.same(
//     signature.generate([['Number', 'String', 'Number'], 'String']),
//     'Number, String, Number -> String',
//     'generates three parameter strips'
//   )
//
//   t.same(
//     signature.generate([['String', null], null]),
//     'String, * -> *',
//     'generates stars for null'
//   )
//
// })
