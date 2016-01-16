# Aerospikedown

[![npm version](https://badge.fury.io/js/aerospike-leveldown.svg)](https://badge.fury.io/js/aerospike-leveldown)
[![npm version](https://img.shields.io/npm/dm/aerospike-leveldown.svg)](https://badge.fury.io/js/aerospike-leveldown)
[![npm version](https://img.shields.io/npm/dt/aerospike-leveldown.svg)](https://badge.fury.io/js/aerospike-leveldown)

A LevelDOWN API compatible Aerospike adapter for LevelUP

This is an implementation of the abstraction layer for aerospike.

For more info see:
* [LevelUp](https://github.com/Level/levelup)
* [LevelDown](https://github.com/Level/leveldown) / [AbstractLevelDown](https://github.com/Level/abstract-leveldown)

# Installation

```sh
npm install aerospike-leveldown --save
```

# How to Use

```js
var AerospikeLevelDOWN = require('./aerospike-leveldown');
var levelup = require('levelup');

var db = levelup('/who/cares/', {
    db: function (location) {
        return new AerospikeLevelDOWN(location)
    },
    address: '127.0.0.1',
    port: 3000
});

// Namespace and set will be needed on every db operation
// in order to know where to save data and where to retrieve it from
var namespace_and_set = {
    namespace: 'test',
    set: 'anything'
};

db.put('foo', 'bar', namespace_and_set, function (err) {
    if (err) throw err;
    db.get('foo', namespace_and_set, function (err, result) {
        if (err) throw err;
        console.log('Got foo =', result.value)
    })
});
```

# Author

[Emanuele Mazzotta](mailto:emanuele.mazzotta@siroop.ch)
