[![Downloads Today](https://img.shields.io/npm/dt/aerospike-leveldown.svg?style=flat)](https://badge.fury.io/js/aerospike-leveldown)
[![Code Climate](https://codeclimate.com/github/ProjectThor/aerospikedown/badges/gpa.svg?style=flat)](https://codeclimate.com/github/ProjectThor/aerospikedown)
[![Dev Dependencies](https://david-dm.org/ProjectThor/aerospikedown.svg?style=flat)](https://david-dm.org/ProjectThor/aerospikedown)
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat)](LICENSE.md) 

# Aerospikedown 

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

[Emanuele Mazzotta](https://emanuelemazzotta.com/)

## License

[MIT License](LICENSE.md) © siroop AG
