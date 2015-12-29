# Aerospikedown

[![npm version](https://badge.fury.io/js/aerospike-leveldown.svg)](https://badge.fury.io/js/aerospike-leveldown)
[![npm version](https://img.shields.io/npm/dm/aerospike-leveldown.svg)](https://badge.fury.io/js/aerospike-leveldown)
[![npm version](https://img.shields.io/npm/dt/aerospike-leveldown.svg)](https://badge.fury.io/js/aerospike-leveldown)

A LevelDOWN API compatible Aerospike adapter for LevelUP

The goal is to have an abstraction layer for aerospike
so that it could easily get replaced with a different database.

For more info see:
* [LevelUp](https://github.com/Level/levelup)
* [LevelDown](https://github.com/Level/leveldown) / [AbstractLevelDown](https://github.com/Level/abstract-leveldown)

# Installation

```sh
npm install aerospike-leveldown
```

# How to Use

The LevelUp package will be needed for this example to work.

Example:

```js
var AerospikeLevelDOWN = require('aerospike-leveldown').AerospikeLevelDOWN;
var levelup = require('levelup');

var databaseOptions = {
    address: '127.0.0.1',
    port: 3000,
    namespace: 'test',
    set: 'anything'
};

var db = levelup('/who/cares/', {
    db: function (location) {
        return new AerospikeLevelDOWN(location)
    },
    address: databaseOptions.address,
    port: databaseOptions.port
});

db.put('foo', 'bar', databaseOptions, function (err) {
    if (err) throw err;
    db.get('foo', databaseOptions, function (err, result) {
        if (err) throw err;
        console.log('Got foo =', result.value)
    })
});
```

# Author

[Emanuele Mazzotta](mailto:emanuele.mazzotta@siroop.ch?Subject=Aerospikedown&body=Hi Emanuele)
