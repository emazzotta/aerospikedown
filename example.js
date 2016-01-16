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