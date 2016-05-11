# Aerospikedown

[![Downloads Today](https://img.shields.io/npm/dt/aerospike-leveldown.svg)](https://badge.fury.io/js/aerospike-leveldown)
[![Dependency Status](https://david-dm.org/ProjectThor/aerospikedown.svg)](https://david-dm.org/ProjectThor/aerospikedown)
[![Code Climate](https://codeclimate.com/github/ProjectThor/aerospikedown/badges/gpa.svg)](https://codeclimate.com/github/ProjectThor/aerospikedown)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)
[![Developed At](https://img.shields.io/badge/developed%20with%20♥%20at-siroop-blue.svg)](https://siroop.ch/)

[![siroop.ch](https://rawgit.com/ProjectThor/aerospikedown/master/img/siroop.png)](https://siroop.ch)

This is a LevelDOWN API compatible Aerospike adapter for LevelUP.

For more information about Level, see:

* [LevelUp](https://github.com/Level/levelup)
* [LevelDown](https://github.com/Level/leveldown) / [AbstractLevelDown](https://github.com/Level/abstract-leveldown)

## Installation

``` sh
npm install aerospike-leveldown --save
```

## Usage

``` js
'use strict';

let AerospikeLevelDOWN = require('aerospike-leveldown');
let levelup = require('levelup');
 
let db = levelup('/who/cares/', {
    db: function (location) {
        return new AerospikeLevelDOWN(location)
    },
    address: '127.0.0.1',
    port: 3000
});
 
// Namespace and set will be needed on every database operation 
// It indicates where to save data and where to retrieve data from 
let namespace_and_set = {
    namespace: 'test',
    set: 'anything'
};
 
// Save value bar with key foo in defined namespace and set
db.put('foo', 'bar', namespace_and_set, function (err) {
    if (err) throw err;
    // Get value from key foo in defined namespace and set
    db.get('foo', namespace_and_set, function (err, result) {
        if (err) throw err;
        console.log('Got foo =', result.value)
        // Delete key foo and its value in defined namespace and set
        db.del('foo', namespace_and_set, function (err) {
            if (err) throw err;
        })
    })
});
```

## Author

[Emanuele Mazzotta](mailto:emanuele.mazzotta@siroop.ch)

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
