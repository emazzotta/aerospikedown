var AerospikeLevelDOWN = require('./').AerospikeLevelDOWN;

var levelup = require('levelup');
var db = levelup('/who/cares/', {
    db: function (location) { return new AerospikeLevelDOWN(location) }
});
db.put('foo', 'bar', function (err) {
    if (err) throw err;
    db.get('foo', function (err, value) {
        if (err) throw err;
        console.log('Got foo =', value)
    })
});