import test from 'ava'

import {
  paramsSerializer,
  UnserializeableParamError,
} from './params-serializer.js'

test('serializes empty object', (t) => {
  t.is(paramsSerializer({}), '')
})

test('serializes string', (t) => {
  t.is(paramsSerializer({ foo: 'd' }), 'foo=d')
  t.is(paramsSerializer({ foo: 'null' }), 'foo=null')
  t.is(paramsSerializer({ foo: 'undefined' }), 'foo=undefined')
  t.is(paramsSerializer({ foo: '0' }), 'foo=0')
})

test('serializes number', (t) => {
  t.is(paramsSerializer({ foo: 1 }), 'foo=1')
  t.is(paramsSerializer({ foo: 23.8 }), 'foo=23.8')
})

test('serializes boolean', (t) => {
  t.is(paramsSerializer({ foo: true }), 'foo=true')
  t.is(paramsSerializer({ foo: false }), 'foo=false')
})

test('removes undefined params', (t) => {
  t.is(paramsSerializer({ bar: undefined }), '')
  t.is(paramsSerializer({ foo: 1, bar: undefined }), 'foo=1')
})

test('removes null params', (t) => {
  t.is(paramsSerializer({ bar: null }), '')
  t.is(paramsSerializer({ foo: 1, bar: null }), 'foo=1')
})

test('serializes empty array params', (t) => {
  t.is(paramsSerializer({ bar: [] }), 'bar=')
  t.is(paramsSerializer({ foo: 1, bar: [] }), 'bar=&foo=1')
})

test('serializes array params with one value', (t) => {
  t.is(paramsSerializer({ bar: ['a'] }), 'bar=a')
  t.is(paramsSerializer({ foo: 1, bar: ['a'] }), 'bar=a&foo=1')
})

test('serializes array params with many values', (t) => {
  t.is(paramsSerializer({ foo: 1, bar: ['a', '2'] }), 'bar=a&bar=2&foo=1')
  t.is(
    paramsSerializer({ foo: 1, bar: ['null', '2', 'undefined'] }),
    'bar=null&bar=2&bar=undefined&foo=1',
  )
})

test('cannot serialize unserializeable values', (t) => {
  t.throws(() => paramsSerializer({ foo: {} }), {
    instanceOf: UnserializeableParamError,
  })
  t.throws(() => paramsSerializer({ foo: { x: 2 } }), {
    instanceOf: UnserializeableParamError,
  })
  t.throws(() => paramsSerializer({ foo: () => {} }), {
    instanceOf: UnserializeableParamError,
  })
})

test('cannot serialize array params with unserializeable values', (t) => {
  t.throws(() => paramsSerializer({ bar: ['a', null] }), {
    instanceOf: UnserializeableParamError,
  })
  t.throws(() => paramsSerializer({ bar: ['a', undefined] }), {
    instanceOf: UnserializeableParamError,
  })
  t.throws(() => paramsSerializer({ bar: ['a', ['s']] }), {
    instanceOf: UnserializeableParamError,
  })
  t.throws(() => paramsSerializer({ bar: ['a', []] }), {
    instanceOf: UnserializeableParamError,
  })
  t.throws(() => paramsSerializer({ bar: ['a', {}] }), {
    instanceOf: UnserializeableParamError,
  })
  t.throws(() => paramsSerializer({ bar: ['a', { x: 2 }] }), {
    instanceOf: UnserializeableParamError,
  })
  t.throws(() => paramsSerializer({ bar: ['a', () => {}] }), {
    instanceOf: UnserializeableParamError,
  })
})
